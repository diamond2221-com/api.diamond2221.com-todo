import { Controller } from "egg";

import { PostAllInfo } from "../../types/post_interface";

export default class ListController extends Controller {
    /**
     * index
     * 获取用户帖子
     */
    public async index() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            page: "number",
            size: "number",
            userId: "string",
        };
        try {
            ctx.validate(rules, ctx.query);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const { page, size, userId } = ctx.query;
        const user_id = ctx.request.header["client-uid"];

        let dealPosts: PostAllInfo[] = await service.post.getUserPostsByUserId(userId, user_id, size, page);
        ctx.send(dealPosts);
    }

}
