import { Controller } from "egg";
import { IUserPost } from "../../types/post_interface";
import { CheckParams } from '../../utils/decorators';


export default class UserController extends Controller {
    /**
     * index
     * 获取用户帖子
     */
    @CheckParams({ page: "number", size: "number", userId: "string" }, "query")
    public async index() {
        const { ctx, service } = this;

        const page: number = ctx.query.page;
        const size: number = ctx.query.size;
        const userId: string = ctx.query.userId;

        const posts: IUserPost[] = await service.post.getUserPostsByUserId(userId, page, size);
        ctx.send(posts);
    }

}
