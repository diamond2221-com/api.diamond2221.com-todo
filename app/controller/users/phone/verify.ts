import { Controller } from "egg";
import { CheckParams } from '../../../utils/decorators';

export default class VerifyController extends Controller {
    @CheckParams({ phoneNumber: "string" }, "request.body")
    public async create() {
        const { ctx, service } = this;
        const body = ctx.request.body;

        const phoneNumber: string = body.phoneNumber;
        const user_id: string = ctx.getUid();

        if (phoneNumber) {
            const hasPhone: boolean = await service.user.verifyRepeatPhoneNumber(user_id, phoneNumber);
            if (hasPhone) {
                return ctx.send("当前手机号已被使用", 400);
            }
        } else {
            return ctx.send("请输入手机号", 400);
        }

        ctx.send("OK", 200)
    }
}
