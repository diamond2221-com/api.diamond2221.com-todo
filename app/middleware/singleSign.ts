import { Application, Context } from 'egg';

export default (options: object, app: Application) => {
    return async (ctx: Context, next: { (arg0: any): void; (arg0: any): void; }) => {
        const url = ctx.request.url;
        const info: string = ctx.request.header["client-info"];
        const userId: string = ctx.request.header["client-uid"];
        const token: string = ctx.request.header[app.config.auth_headers_name];
        let signToken: string | null = await app.redis.get(
            `${info}---${userId}`
        );

        if (app.config.authWhiteList.some(item => url.includes(item))) {
            return await next(options)
        }
        app.logger.info(
            `接口： ${ctx.request.url}\n`,
            `最新的Token: ${info} --- ${signToken}\n`,
            `请求的Token: ${info} --- ${token}\n`
        )

        if (token !== signToken) {
            return ctx.send("账号已在别处,请您重新登录", 17);
        }
        await next(options)
    }
}
