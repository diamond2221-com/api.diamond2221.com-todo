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
        const { ctx } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            userName: "string",
            passWord: "string",
            rePassWord: "string",
        };
        try {
            ctx.validate(rules, ctx.request.body);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const RegisterParams: RegisterParams = ctx.request.body;

        const hasUser: boolean = Boolean(await this.service.user.getUserInfoByUsername(RegisterParams.userName))
        if (hasUser) {
            return ctx.send("当前用户名已被占用", 400)
        }

        if (RegisterParams.passWord !== RegisterParams.rePassWord) {
            return ctx.send("两次密码不相同", 400);
        }

        const res: boolean = await this.service.account.Register(RegisterParams);

        if (res) {
            return ctx.send("注册成功", 200)
        }

        return ctx.send("服务异常，请稍后再试", 99)

    }

}
