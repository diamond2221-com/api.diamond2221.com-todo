import { Controller } from 'egg';
import {
    BasePost,
    PostA
} from "../../types/post_interface";

export default class MarkPostController extends Controller {
    /**
     * getUserMarkPosts
     * 获取用户收藏的帖子
     */
    public async index() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            page: 'string',
            size: 'string'
        };

        ctx.validate(rules, ctx.query);

        const { page, size } = ctx.query;
        const userId = ctx.request.header["Client-Uid"];

        let postIds: { postId: number }[] = await service.post.getUserMarkPostsByUserId(userId, Number(size), Number(page));
        let posts: BasePost[] = [];

        for (const postId of postIds) {
            let post: BasePost = await service.post.getPostByPostId(postId.postId)
            posts = [...posts, post]
        }
        let dealPosts: [PostA] | [] = await service.post.getPostInfo(posts);
        ctx.send(dealPosts, 200, "成功");
    }

}


