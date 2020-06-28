import { Controller } from "egg";

import { timestampToTime } from "../../utils/common";

import { IPost } from "../../types/post_interface";
import { User } from "../../model/user";
import { CheckParams } from '../../utils/decorators';


export default class AddController extends Controller {
    /**
     * 用户添加帖子
     */
    @CheckParams({ content: "string", imgs: "array", status: [1, 2] }, "request.body")
    public async create() {
        const { ctx, service } = this;

        const { post } = service;
        const { content, imgs, status = 1 } = ctx.request.body;
        const userId = ctx.request.header["client-uid"];

        let newPost = await post.addPost(content, imgs, status, userId);
        try {
            const userInfo: User = await service.user.getUserInfoByUserId(newPost.userId) as User;
            const focused: boolean = false;
            const result: IPost = {
                ...newPost,
                status,
                userName: userInfo.userName,
                img: userInfo.img,
                addTime: timestampToTime(newPost.addTime),
                comment: {
                    edges: {
                        edges: [],
                        count: 0
                    },
                    count: 0
                },
                likeNum: 0,
                marked: false,
                liked: false,
                focused
            }

            ctx.send(result, 200, "发帖成功");
        } catch (error) {
            this.app.logger.error(error);
            ctx.send("服务异常", 99)
        }
    }
}
