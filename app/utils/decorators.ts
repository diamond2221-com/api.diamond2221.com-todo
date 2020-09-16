import { Controller } from "egg"

export function CheckParams(rules: any = {}, dataPath: 'query' | 'request.body' | 'params' | 'request.query'): MethodDecorator {
    return function (_target, _key, descriptor: any): any {
        const originalMethod = descriptor.value;
        descriptor.value = function (this: Controller, ...args: any[]) {
            const { ctx } = this;
            try {
                const path = dataPath.split('.')
                let data: any = ctx
                if (path.length === 1) {
                    data = ctx[dataPath]
                } else {
                    path.forEach(v => {
                        data = data[v]
                    })
                }
                this.app.logger.info('\n接口：', ctx.url, '\n参数：', data)
                ctx.validate(rules, ctx[dataPath]);
            } catch (error) {
                return ctx.send("参数错误", 400)
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    }
}
