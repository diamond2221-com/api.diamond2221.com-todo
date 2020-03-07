import { Controller } from "egg";

import { timestampToTime } from "../../utils/common";

import { IPostComment } from "../../types/post_interface";
import { User } from "../../model/user";

export default class CommentsController extends Controller {

    /**
     * 添加帖子评论
    */
    public async create() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            content: "string",
            postId: "number"
        };
        try {
            ctx.validate(rules, ctx.request.body);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const { content, postId } = ctx.request.body;
        const userId = ctx.request.header["client-uid"];

        const comment = await service.post.addComments(postId, userId, content);

        let userInfo: User = await service.user.getUserInfoByUserId(comment.userId) as User;

        if (comment) {
            const result: IPostComment = {
                id: comment.commentId,
                content: comment.content,
                userId: comment.userId,
                addTime: timestampToTime(Number(comment.addTime)),
                userName: userInfo.userName,
                userImg: userInfo.img
            }
            ctx.send(result, 200, "评论成功")
        }

    }
}
