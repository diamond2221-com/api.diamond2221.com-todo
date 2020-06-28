import { Controller } from "egg";
import { MathRand } from "../../../utils/common";
import { CheckParams } from '../../../utils/decorators';

export default class SmsController extends Controller {
    @CheckParams({ phoneNumber: "number"}, "request.body")
    public async create() {
        const { ctx, app } = this;
        const { body } = ctx.request;
        const phoneNumber: string = `${body.phoneNumber}`;

        try {
            const code: string = MathRand();
            if (this.app.config.env !== 'local') {
                await ctx.sendSms({ phoneNumbers: phoneNumber, SignName: "diamond社交空间", TemplateCode: "SMS_183797211", Code: code });
            }
            await app.redis.set(`${phoneNumber}-signUp`, code, 'EX', 60 * 5);
            ctx.send("验证码已发送")
        } catch (error) {
        }
    }
}
