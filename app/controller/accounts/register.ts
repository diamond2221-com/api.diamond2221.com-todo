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
        const RegisterParams: RegisterParams = ctx.request.body;

        const hasUser: boolean = await this.service.account.getUserByUserName(RegisterParams.userName);
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
