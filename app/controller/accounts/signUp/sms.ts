import { Controller } from "egg";
import { MathRand } from "../../../utils/common";

export default class SmsController extends Controller {
    public async create() {
        const { ctx, app } = this;
        const { body } = ctx.request;
        const rules = {
            phoneNumber: "number"
        }
        try {
            ctx.validate(rules, body)
        } catch (error) {
            return ctx.send('参数错误', 400);
        }
        const phoneNumber: string = `${body.phoneNumber}`;

        try {
            const code: string = MathRand();
            await ctx.sendSms({ phoneNumbers: phoneNumber, SignName: "diamond社交空间", TemplateCode: "SMS_183797211", Code: code });
            await app.redis.set(`${phoneNumber}`, code, 'EX', 60 * 5);
            ctx.send("验证码已发送")
        } catch (error) {
            app.logger.error(error);
            ctx.send(error.data.Message || "验证码发送失败，请稍后再试。", 400)
        }
    }
}
