import { Application, Context } from "egg";
import * as jwt from "jsonwebtoken";
interface token {
    userId: number;
    userName: string;
    iat: number;
    exp: number
}
export default (options: any, app: Application) => {
    return async (ctx: Context, next: { (arg0: any): void; (arg0: any): void; }) => {
        const { request } = ctx;
        const { url } = request;
        if (app.config.authWhiteList.some(item => url.includes(item))) {
            await next(options)
            return;
        } else {
            const token: string | null = request.header["client-token"];
            if (!token) {
                ctx.send("您未登录，请登录后再试", 401);
                return;
            }
            let info: token | any;
            try {
                info = jwt.verify(token, app.config.jwtSecret);
            } catch (error) {
                ctx.send("您未登录，请登录后再试", 401)
                return;
            }
            if (info.userId !== ctx.request.header["client-uid"]) {
                ctx.send("您未登录，请登录后再试", 401)
                return;
            }

            if (await app.model.User.getUserInfoByUserId(ctx.request.header["client-uid"])) {
                await next(options);
            } else {
                ctx.send("用户不存在", 10)
            }
        }
    }
}
