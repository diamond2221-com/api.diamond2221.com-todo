import { Controller } from "egg";
import { LoginParams } from '../../types/account_interface';
import { UserInfo } from "../../types/account_interface"


export default class LoginController extends Controller {
    /**
     * @description 用户登录
     * @author ZhangYu
     * @date 2019-08-30
     * @memberof AccountController
     */
    public async create() {
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

}