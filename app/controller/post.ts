import { Controller } from 'egg';

export default class PostController extends Controller {
    /**
     * getUserPosts
     * 获取用户帖子
     */
    public async getUserPosts() {
        const { ctx } = this;
        // console.log(ctx.query);
        const { page, size } = ctx.query;

        const posts = await this.service.user.getUserPostsByUserId(1, size, page);
        // console.log(posts)
        this.ctx.send(200, "成功", posts);
    }

}


