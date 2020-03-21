import { Controller } from "egg";

import { IUserPost } from "../../types/post_interface";

export default class UserController extends Controller {
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

        const page: number = ctx.query.page;
        const size: number = ctx.query.size;
        const userId: string = ctx.query.userId;

        const posts: IUserPost[] = await service.post.getUserPostsByUserId(userId, page, size);
        ctx.send(posts);
    }

}
