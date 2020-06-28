import { Controller } from "egg"
import { IVisitRecordType } from '../../types/common';
import { CheckParams } from '../../utils/decorators';

export default class VisitController extends Controller {
    @CheckParams({ user_id: "string", type: [1, 2], }, "request.body")
    public async create() {
        const { ctx, service } = this;
        const body = ctx.request.body;
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
            this.app.logger.error(error);
            return ctx.send("服务异常", 99)
        }
    }
}
