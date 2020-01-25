import { Controller } from "egg";
// import { IUser } from "../../types/user_interface";

export default class SearchController extends Controller {
    public async index() {
        const { ctx, service } = this;
        const { name } = ctx.query;
        if (!name) {
            return ctx.send([], 200)
        }
        const res: {
            focusNum: number;
            fansNum: number;
            userId: string;
            userName: string;
            passWord: string;
            img: string;
            name: string;
            signature: string;
            website: string;
            badge: number;
            addTime: string;
            lastTime: string;
            id: any;
        }[] = await service.user.searchUser(name);

        ctx.send(res, 200)
    }

    public async create() {
        const { ctx, service } = this;
        const { name } = ctx.body;
        if (!name) {
            return ctx.send([], 200)
        }
        const res: {
            focusNum: number;
            fansNum: number;
            userId: string;
            userName: string;
            passWord: string;
            img: string;
            name: string;
            signature: string;
            website: string;
            badge: number;
            addTime: string;
            lastTime: string;
            id: any;
        }[] = await service.user.searchUser(name);

        ctx.send(res, 200)
    }
}
