import { Controller } from "egg";

export default class VerifyController extends Controller {
    public async create() {
        const { ctx, service, app } = this;
        const body = ctx.request.body;
        // 定义创建接口的请求参数规则
        const rules = {
            phoneNumber: "string",
            verifyCode: "string"
        };
        try {
            ctx.validate(rules, body);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const phone_number: string = body.phoneNumber;
        const verifyCode: string = body.verifyCode;
        const user_id: string = ctx.getUid();

        const key: string = `${phone_number}-updatePhoneSms`
        const code = await app.redis.get(key);
        await app.redis.del(key)
        if (!code) {
            return ctx.send("验证码已失效", 400);
        }

        if (code !== verifyCode) {
            return ctx.send("验证码不正确", 400)
        }

        try {
            await service.user.changeUserInfoByUserId(user_id, { phone_number: phone_number })
            ctx.send("OK", 200)
        } catch (error) {
            ctx.send("服务异常", 99)
        }
    }
}
