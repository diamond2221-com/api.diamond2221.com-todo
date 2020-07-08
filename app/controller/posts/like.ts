import { Controller } from 'egg';
import { CheckParams } from '../../utils/decorators';

export default class LikeController extends Controller {
    /**
     * @description 用户喜欢帖子
     * @author ZhangYu
     * @date 2020-02-07
     * @returns
     * @memberof LikePostController
     */
    @CheckParams({ postId: 'number' }, "request.body")
    public async create() {
        const { ctx, service } = this;
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

    /**
     * @description 用户取消喜欢帖子
     * @author ZhangYu
     * @date 2020-02-08
     * @memberof LikePostController
     */
    @CheckParams({ id: 'number' }, "params")
    public async destroy() {
        try {
            const { ctx, service } = this;
            const postId: string = ctx.params.id;
            const userId = ctx.request.header["client-uid"];
            await service.post.cancelLikePostByPostId(Number(postId), userId);

            ctx.send({}, 200, "取消喜欢成功")
        } catch (error) {
            this.app.logger.error(error)
        }
    }
}


