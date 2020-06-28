import { Controller } from "egg";
import { User } from "../../model/user";
import { IPostComment } from "../../types/post_interface";
import { timestampToTime } from "../../utils/common";
import { CheckParams } from '../../utils/decorators';

export default class CommentsController extends Controller {
    @CheckParams({ postId: "number", rId: "number", page: "number", size: "number" }, "query")
    public async index() {
        const { ctx, service } = this;
        const { query } = ctx;

        const postId: number = Number(query.postId);
        const rId: number = Number(query.rId);
        const page: number = Number(query.page);
        const size: number = Number(query.size);

        const res = await service.comment.getPostComments(postId, rId, page, size)
        ctx.send(res)
    }

    /**
     * 添加帖子评论
    */
    @CheckParams({ content: "string", postId: "number", rId: "number", pId: "number", }, "request.body")
    public async create() {
        const { ctx, service } = this;
        const { body } = ctx.request;

        const { content, postId } = body;
        const rId: number = Number(body.rId);
        const pId: number = Number(body.pId);
        const userId = ctx.getUid();

        const comment = await service.comment.addComments(postId, userId, content, rId, pId);

        let userInfo: User = await service.user.getUserInfoByUserId(comment.userId) as User;

        if (comment) {
            const result: IPostComment = {
                id: comment.id,
                postId: comment.postId,
                content: comment.content,
                userId: comment.userId,
                rId: comment.rId,
                addTime: timestampToTime(Number(comment.addTime)),
                userName: userInfo.userName,
                userImg: userInfo.img
            }
            ctx.send(result, 200, "评论成功")
        }

    }
}
