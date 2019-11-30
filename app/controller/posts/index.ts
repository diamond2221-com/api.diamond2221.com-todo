import { timestampToTime } from "../../utils/common";
import { Controller } from 'egg';
import {
    BasePost,
    PostA,
    UserInfo
} from "../../types/post_interface";

export default class PostController extends Controller {
    /**
     * getUserPosts
     * 获取用户帖子
     */
    public async getUserPosts() {
        const { ctx, service } = this;
        const { page, size, userId } = ctx.query;
        // const userId = ctx.request.header["Client-Uid"];

        let posts: [BasePost] | [] = await service.post.getUserPostsByUserId(userId, Number(size), Number(page));

        let dealPosts: [PostA] | [] = await service.post.getPostInfo(posts);
        ctx.send(dealPosts, 200, "成功");
    }

    /**
     * getUserMarkPosts
     * 获取用户收藏的帖子
     */
    public async getUserMarkPosts() {
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


    /**
     * 添加帖子评论
     */
    public async addComments() {
        const { ctx, service } = this;
        const { content, postId } = ctx.request.body;
        const userId = ctx.request.header["Client-Uid"];

        const comment = await service.post.addComments(Number(postId), userId, content);

        let userInfo: UserInfo = await service.user.getUserInfoByUserId(comment.userId);

        if (comment) {
            ctx.send({
                ...comment,
                addTime: timestampToTime(Number(comment.addTime)),
                userName: userInfo.userName
            }, 200, "评论成功")
        }

    }



    /**
     * @description 获取所有帖子 按日期降序
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof PostController
     */
    public async index() {
        const { ctx, service } = this;
        const { page, size } = ctx.query;

        let posts: [BasePost] | [] = await service.post.getPosts(Number(size), Number(page));

        let dealPosts: [PostA] | [] = await service.getPostInfo(posts);
        ctx.send(dealPosts, 200);
    }
}


