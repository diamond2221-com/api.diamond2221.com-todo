import { Controller } from "egg";
import { CheckParams } from '../../../utils/decorators';

export default class VerifyController extends Controller {
    @CheckParams({ phoneNumber: "string", verifyCode: "string" }, "request.body")
    public async create() {
        const { ctx, service, app } = this;
        const body = ctx.request.body;
        const phone_number: string = body.phoneNumber;
        const verifyCode: string = body.verifyCode;
        const user_id: string = ctx.getUid();

        const key: string = `${phone_number}-updatePhoneSms`
        const code = await app.redis.get(key);
        if (!code) {
            return ctx.send("验证码已失效", 400);
        }

        if (code !== verifyCode) {
            return ctx.send("验证码不正确", 400)
        }
        await app.redis.del(key)

        try {
            await service.user.changeUserInfoByUserId(user_id, { phoneNumber: phone_number })
            ctx.send("OK", 200)
        } catch (error) {
            ctx.send("服务异常", 99)
        }
    }
}
