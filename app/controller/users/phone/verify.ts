import { Controller } from "egg";

export default class VerifyController extends Controller {
    public async create() {
        const { ctx, service } = this;
        const body = ctx.request.body;
        // 定义创建接口的请求参数规则
        const rules = {
            phoneNumber: "string",
        };
        try {
            ctx.validate(rules, body);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

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
