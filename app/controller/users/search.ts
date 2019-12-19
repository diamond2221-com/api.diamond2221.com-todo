import { Controller } from "egg";
import { IUser } from "../../types/user_interface";

export default class SearchController extends Controller {
    public async index() {
        const { ctx, service } = this;
        const { name } = ctx.query;
        if (!name) {
            return ctx.send([], 200)
        }
        const res: IUser[] = await service.user.searchUser(name);

        let options = {
            include: [{ model: this.app.model.User }]
        }
        let re1 = await this.app.model.Focus.findAndCountAll(options)
        console.log(res)
        ctx.send({ re1 }, 200)
    }
}
