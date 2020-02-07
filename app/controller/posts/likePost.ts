import { Controller } from 'egg';

export default class LikePostController extends Controller {
    /**
     * @description 用户喜欢帖子
     * @author ZhangYu
     * @date 2020-02-07
     * @returns
     * @memberof LikePostController
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

        const postId: number = ctx.request.body.postId;
        const userId: string = ctx.request.header["client-uid"];
        let isLiked: boolean = await service.post.getUserLikedPost(userId, postId)

        if (isLiked) {
            ctx.send("已经对该帖子喜欢过了", 400);
        } else {
            await service.post.likePostByPostId(postId, userId);
            ctx.send("喜欢成功", 200);
        }
    }
}


