import * as jwt from "jsonwebtoken";

export default (options: any, app: { config: { authWhiteList: { indexOf: (arg0: any) => number; }; jwtSecret: string | Buffer; }; }) => {
    return async (ctx: { request?: any; send?: any; jwt?: any; }, next: { (arg0: any): void; (arg0: any): void; }) => {
        const { request } = ctx;
        if (app.config.authWhiteList.indexOf(request.url) !== -1) {
            await next(options)
            return;
        }
        const token: string | null = request.header["client-token"];
        if (!token) {
            ctx.send(401, "您未登录，请登录后再试");
            return;
        }
        try {
            jwt.verify(token, app.config.jwtSecret);
        } catch (error) {
            ctx.send(401, "您未登录，请登录后再试")
            return;
        }
        await next(options);
    }
}
