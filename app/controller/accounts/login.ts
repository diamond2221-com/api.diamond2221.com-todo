import { Controller } from "egg";
import { LoginParams } from '../../types/account_interface';
import { User } from "../../model/user"


export default class LoginController extends Controller {
    /**
     * @description 用户登录
     * @author ZhangYu
     * @date 2019-08-30
     * @memberof AccountController
     */
    public async create() {
        const { ctx, service, app } = this;
        // 定义创建接口的请求参数规则
        const rules = {
            userName: "string",
            passWord: 'string'
        };

        try {
            ctx.validate(rules, ctx.request.body);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const LoginParams: LoginParams = ctx.request.body;

        let user: User | null = await service.accounts.getUserByUserNamePassWord(LoginParams);
        const info: string = await ctx.request.header["client-info"];
        if (user) {
            let token: string = await service.accounts.Login(user.userName, user.userId);

            await app.redis.set(`${info}---${user.userId}`, token, 'EX', ((60 * 60 * 24 * 7) - 2))
            ctx.send({
                token,
                ...user
            }, 200, "登录成功");
        } else {
            ctx.send("账号或密码错误", 400);
        }
    }

}
