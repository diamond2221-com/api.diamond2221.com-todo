import { Controller } from 'egg';

import { IUserPost } from "../../types/post_interface";
import { CheckParams } from '../../utils/decorators';

export default class AllController extends Controller {
    /**
     * @description 获取所有帖子 按日期降序
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof PostController
     */
    @CheckParams({ page: "number", size: "number" }, "query")
    public async index() {
        const { ctx, service } = this;
        const { page, size } = ctx.query;

        let posts = await service.post.getPosts(size, page);
        this.app.logger.warn(posts);
        // const user_id: string = this.ctx.request.header["client-uid"]

        let dealPosts: IUserPost[] = await service.post.getPostsInfo(posts)
        ctx.send(dealPosts);
    }
}


