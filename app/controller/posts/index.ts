import { Controller } from "egg";
import { IPost } from "../../types/post_interface";

export default class IndexController extends Controller {
    /**
     * index
     * 获取用户帖子
     */
    public async index() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            page: "number",
            size: "number"
        };
        try {
            ctx.validate(rules, ctx.query);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const page: number = Number(ctx.query.page);
        const size: number = Number(ctx.query.size);
        const user_id = ctx.request.header["client-uid"];
        const users = await service.user.getFocusListByUserId(user_id, 1, 1000000);
        const userIds: string[] = [...(new Set([...users.map(user => user.userId), user_id]))];
        let dealPosts: IPost[] = await service.post.getPostsByUserId(user_id, userIds, page, size);

        ctx.send(dealPosts, 200);
    }

}
