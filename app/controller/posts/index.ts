import { Controller } from "egg";
import { IPost } from "../../types/post_interface";
import { CheckParams } from '../../utils/decorators';

export default class IndexController extends Controller {
    /**
     * index
     * 获取用户帖子
     */
    @CheckParams({ page: "number", size: "number" }, "query")
    public async index() {
        const { ctx, service } = this;
        const page: number = Number(ctx.query.page);
        const size: number = Number(ctx.query.size);
        const users = await service.user.getFocusListByUserId(ctx.getUid(), 1, 1000000);
        const userIds: string[] = [...(new Set(users.map(user => user.userId)))];
        let dealPosts: IPost[] = await service.post.getPostsByUserId(userIds, page, size);

        ctx.send(dealPosts, 200);
    }

}
