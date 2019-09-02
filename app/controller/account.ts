import { Controller } from "egg";
import { LoginParams, RegisterParams } from '../types/account_interface';
// import md5 from "../utils/md5";

interface UserInfo {
    addTime: string;
    badge: number;
    img: string;
    name: string | null;
    password: string;
    signature: string | null;
    userId: number;
    username: string;
    website: string | null;
    lastTime: string;
}

export default class AccountController extends Controller {
    /**
     * @description 用户登录
     * @author ZhangYu
     * @date 2019-08-30
     * @memberof AccountController
     */
    public async login() {
        const { ctx, service } = this;
        const LoginParams: LoginParams = ctx.request.body;

        let user: UserInfo | null = await service.account.getUserByUserNamePassWord(LoginParams);
        if (user) {
            let token: string = await service.account.Login(user.username, user.userId);

            ctx.send(200, "登录成功", {
                token,
                userName: user.username,
                badge: user.badge,
                img: user.img,
                name: user.name,
                signature: user.signature,
                userId: user.userId,
                website: user.website,
            });
        } else {
            ctx.send(400, "账号或密码错误");
        }
    }


    /**
     * @description 用户注册
     * @author ZhangYu
     * @date 2019-08-30
     * @returns
     * @memberof AccountController
     */
    public async register() {
        const { ctx } = this;
        const RegisterParams: RegisterParams = ctx.request.body;

        const hasUser: boolean = await this.service.account.getUserByUserName(RegisterParams.userName);
        if (hasUser) {
            return ctx.send(400, "当前用户名已被占用")
        }

        if (RegisterParams.passWord !== RegisterParams.rePassWord) {
            return ctx.send(400, "两次密码不相同");
        }

        const res: boolean = await this.service.account.Register(RegisterParams);

        if (res) {
            return ctx.send(200, "注册成功")
        }

        return ctx.send(99, "服务异常，请稍后再试")

    }

}
