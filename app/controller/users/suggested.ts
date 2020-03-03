import { Controller } from "egg";

export default class SuggestedController extends Controller {
    public async index() {
        const { ctx, service } = this;
        const { query } = ctx;
        const rules = {
            page: "number",
            size: 'number'
        }
        try {
            ctx.validate(rules, query);
        } catch (error) {
            ctx.send('参数错误', 400)
        }

        const page: number = Number(query.page);
        const size: number = Number(query.size);
        const user_id: string = ctx.getUid();
        ctx.send(await service.user.getSuggestedUser(page, size, user_id), 200);
    }
}
