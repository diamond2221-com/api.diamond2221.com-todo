import * as jwt from "jsonwebtoken";
interface token {
    userId: number;
    userName: string;
    iat: number;
    exp: number
}
export default (options: any, app: { config: { authWhiteList: { indexOf: (arg0: any) => number; }; jwtSecret: string | Buffer; }; }) => {
    return async (ctx: { request?: any; send?: any; jwt?: any; query: any; }, next: { (arg0: any): void; (arg0: any): void; }) => {
        const { request } = ctx;
        if (app.config.authWhiteList.indexOf(request.url) !== -1) {
            await next(options)
            return;
        }
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
        ctx.query = {
            ...ctx.query,
            userId: info.userId
        }
        ctx.request.body = {
            ...ctx.request.body,
            userId: info.userId
        }
        await next(options);
    }
}
