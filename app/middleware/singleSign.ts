import { Application, Context } from 'egg';

export default (options: object, _app: Application) => {
    return async (_ctx: Context, next: { (arg0: any): void; (arg0: any): void; }) => {
        await next(options)
    }
}
