import { Controller } from "egg"
type Path = 'query' | 'request.body' | 'params' | 'request.query'

export function CheckParams(rules: any[] | any = {}, dataPath: Path | Path[]): MethodDecorator {
    return function (_target, _key, descriptor: any): any {
        const originalMethod = descriptor.value;
        descriptor.value = function (this: Controller, ...args: any[]) {
            const { ctx } = this;
            try {
                if (Array.isArray(rules) && Array.isArray(dataPath)) {
                    this.app.logger.info('\n接口：', ctx.url)
                    const flag = rules.every((v, i) => {
                        const path = (dataPath[i]).split('.')
                        let data: any = ctx
                        if (path.length === 1) {
                            data = ctx[dataPath[i]]
                        } else {
                            path.forEach(v => {
                                data = data[v]
                            })
                        }
                        this.app.logger.info('\n参数：', data)
                        try {
                            ctx.validate(v, ctx[dataPath[i]]);
                        } catch (error) {
                            return false
                        }
                        return true
                    })
                    if (!flag) {
                        throw new Error("参数错误");
                    }
                } else {
                    const path = (dataPath as Path).split('.')
                    let data: any = ctx
                    if (path.length === 1) {
                        data = ctx[dataPath as Path]
                    } else {
                        path.forEach(v => {
                            data = data[v]
                        })
                    }
                    this.app.logger.info('\n接口：', ctx.url, '\n参数：', data)
                    ctx.validate(rules, ctx[dataPath as Path]);
                }
            } catch (error) {
                return ctx.send("参数错误", 400)
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    }
}
