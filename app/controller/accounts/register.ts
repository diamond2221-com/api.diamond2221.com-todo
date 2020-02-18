import { Controller } from "egg";
import { RegisterParams } from '../../types/account_interface';

export default class RegisterController extends Controller {
    /**
     * @description 用户注册
     * @author ZhangYu
     * @date 2019-08-30
     * @returns
     * @memberof AccountController
     */
    public async create() {
        const { ctx, app, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            userName: "string",
            phoneNumber: "number",
            passWord: "string",
            rePassWord: "string",
            verifyCode: "string"
        };
        try {
            ctx.validate(rules, ctx.request.body);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

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

        const code: string | null = await app.redis.get(`${RegisterParams.phoneNumber}`);

        if (!code ) {
            return ctx.send('验证码已失效,请重新获取', 400);
        }

        if (code !== RegisterParams.verifyCode) {
            return ctx.send('验证码不正确', 400);
        }

        const res: boolean = await service.accounts.Register(RegisterParams);

        if (res) {
            await app.redis.del(`${RegisterParams.phoneNumber}`);
            return ctx.send("注册成功", 200)
        }

        return ctx.send("服务异常，请稍后再试", 99)
    }

}
