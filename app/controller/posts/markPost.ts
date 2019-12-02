import { Controller } from 'egg';
import {
    BasePost,
    PostA
} from "../../types/post_interface";

export default class MarkPostController extends Controller {
    /**
     * 获取用户收藏的帖子
     */
    public async index() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            page: 'number',
            size: 'number'
        };

        try {
            ctx.validate(rules, ctx.query);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const { page, size } = ctx.query;
        const userId = ctx.request.header["client-uid"];

        let postIds: { postId: number }[] = await service.post.getUserMarkPostsByUserId(userId, Number(size), Number(page));
        let posts: BasePost[] = [];

        for (const postId of postIds) {
            let post: BasePost = await service.post.getPostByPostId(postId.postId)
            posts = [...posts, post]
        }
        let dealPosts: [PostA] | [] = await service.post.getPostInfo(posts);
        ctx.send(dealPosts);
    }

    /**
     * @description 用户收藏帖子
     * @author ZhangYu
     * @date 2019-09-02
     * @memberof MarkPostController
     */
    public async create() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            postId: 'number'
        };

        try {
            ctx.validate(rules, ctx.request.body);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const { postId } = ctx.request.body;
        const userId = ctx.request.header["client-uid"];
        const isMark: boolean = await service.user.findMarkPost(postId, userId);

        if (isMark) {
            ctx.send("已收藏该帖子", 400);
        } else {
            const isSelfPost: boolean = await service.user.isSelfPost(Number(postId), userId);
            if (isSelfPost) {
                ctx.send("不可以收藏自己的帖子", 400);
            } else {
                await service.user.markPostByPostId(Number(postId), userId);
                ctx.send({}, 200, "收藏成功");

            }
        }
    }
}


