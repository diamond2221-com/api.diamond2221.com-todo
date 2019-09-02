import { Controller } from "egg";
import { LoginParams, RegisterParams } from '../types/account_interface';
// import md5 from "../utils/md5";
import { UserInfo } from "../types/account_interface"


export default class AccountController extends Controller {
    /**
     * login
     */
    public async login() {
        const { ctx, service } = this;
        const LoginParams: LoginParams = ctx.request.body;

        let user: UserInfo | null = await service.account.getUserByUserNamePassWord(LoginParams);
        if (user) {
            let token: string = await service.account.Login(user.userName, user.userId);

            ctx.send({
                token,
                userName: user.userName,
                badge: user.badge,
                img: user.img,
                name: user.name,
                signature: user.signature,
                userId: user.userId,
                website: user.website,
            }, 200, "登录成功");
        } else {
            ctx.send("账号或密码错误", 400);
        }
    }

    /**
     * register
     */
    public async register() {
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
