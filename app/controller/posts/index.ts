import { Controller } from 'egg';

import {
    BasePost,
    PostA
} from "../../types/post_interface";

export default class IndexController extends Controller {
    /**
     * @description 获取所有帖子 按日期降序
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof PostController
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

        const { page, size } = ctx.query;

        let posts: BasePost[] = await service.post.getPosts(size, page);

        let dealPosts: PostA[] = await service.post.getPostInfo(posts);
        ctx.send(dealPosts);
    }
}


