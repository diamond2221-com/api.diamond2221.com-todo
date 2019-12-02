import { Controller } from "egg";

import { timestampToTime } from "../../utils/common";

import {
    UserInfo
} from "../../types/post_interface";

export default class CommentsController extends Controller {

    /**
     * 添加帖子评论
    */
    public async create() {
        const { ctx, service } = this;
        const { content, postId } = ctx.request.body;
        const userId = ctx.request.header["client-uid"];

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
}
