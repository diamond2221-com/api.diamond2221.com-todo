import { Controller } from "egg"
import { IVisitRecordType } from '../../types/common';

export default class VisitController extends Controller {
    public async create() {
        const { ctx, service } = this;
        const body = ctx.request.body;

        // 定义创建接口的请求参数规则
        const rules = {
            user_id: "string",
            type: [1, 2],
        }
        try {
            ctx.validate(rules, body);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const visit_user_id: string = ctx.getUid();
        const user_id: string = body.user_id;
        const type: IVisitRecordType = body.type;
        if (user_id === visit_user_id) {
            return ctx.send("OK", 200)
        }
        try {
            await service.record.createVisitRecord(user_id, visit_user_id, type)
            return ctx.send('OK', 200)
        } catch (error) {
            return ctx.send("服务异常", 400)
        }
    }
}
