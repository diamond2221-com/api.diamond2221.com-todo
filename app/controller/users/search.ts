import { Controller } from "egg";
import { IUser } from "../../types/user_interface";
import { CheckParams } from '../../utils/decorators';

export default class SearchController extends Controller {
    @CheckParams({ name: "string?" }, "query")
    public async index() {
        const { ctx, service } = this;
        const { name } = ctx.query;
        if (!name) {
            return ctx.send([], 200)
        }
        const res: IUser[] = await service.user.searchUser(name);

        ctx.send(res, 200)
    }
}
