import { Controller } from "egg";
import { CheckParams } from '../../utils/decorators';

export default class SuggestedController extends Controller {
    @CheckParams({ page: "number", size: 'number' }, "query")
    public async index() {
        const { ctx, service } = this;
        const { query } = ctx;
        const page: number = Number(query.page);
        const size: number = Number(query.size);
        const user_id: string = ctx.getUid();
        ctx.send(await service.user.getSuggestedUser(page, size, user_id), 200);
    }
}
