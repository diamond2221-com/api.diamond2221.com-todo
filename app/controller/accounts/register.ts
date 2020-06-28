import { Controller } from "egg";
import { RegisterParams } from '../../types/account_interface';
import { CheckParams } from '../../utils/decorators';

export default class RegisterController extends Controller {
    /**
     * @description 用户注册
     * @author ZhangYu
     * @date 2019-08-30
     * @returns
     * @memberof AccountController
     */
    @CheckParams({ userName: "string", phoneNumber: "number", passWord: "string", rePassWord: "string", verifyCode: "string" }, "request.body")
    public async create() {
        const { ctx, app, service } = this;
        const RegisterParams: RegisterParams = ctx.request.body;

        const hasUser: boolean = await service.accounts.verifyRepeatUserName(RegisterParams.userName);
        if (hasUser) {
            return ctx.send("当前用户名已被占用", 400)
        }

        const hasPhone: boolean = await service.accounts.verifyRepeatPhoneNumber(RegisterParams.phoneNumber);
        if (hasPhone) {
            return ctx.send("当前手机号已被使用", 400)
        }

        if (RegisterParams.passWord !== RegisterParams.rePassWord) {
            return ctx.send("两次密码不相同", 400);
        }

        const code: string | null = await app.redis.get(`${RegisterParams.phoneNumber}-signUp`);

        if (!code) {
            return ctx.send('验证码已失效,请重新获取', 400);
        }

        if (code !== RegisterParams.verifyCode) {
            return ctx.send('验证码不正确', 400);
        }

        const res: boolean = await service.accounts.Register(RegisterParams.userName, RegisterParams.phoneNumber, RegisterParams.passWord);

        if (res) {
            await app.redis.del(`${RegisterParams.phoneNumber}-signUp`);
            return ctx.send("注册成功", 200)
        }

        return ctx.send("服务异常", 99)
    }

    // public async index() {
    //     const { ctx, service } = this;
    //     const RegisterParams: { userName: string; phoneNumber: string; passWord: string; } = ctx.query;
    //     await service.accounts.Register(RegisterParams.userName, Number(RegisterParams.phoneNumber), RegisterParams.passWord);
    //     ctx.send('OK', 200)
    // }

}
