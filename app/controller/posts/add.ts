import { Controller } from "egg";

import { timestampToTime } from "../../utils/common";

import { IPost } from "../../types/post_interface";
import { User } from "../../model/user";

export default class AddController extends Controller {
    /**
     * 用户添加帖子
     */
    public async create() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            content: "string",
            imgs: "array"
        };
        try {
            ctx.validate(rules, ctx.request.body);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const { post } = service;
        const { content, imgs } = ctx.request.body;
        const userId = ctx.request.header["client-uid"];

        let newPost = await post.addPost(content, imgs, userId);
        try {
            const userInfo: User = await service.user.getUserInfoByUserId(newPost.userId) as User;
            const focused: boolean = false;
            const result: IPost = {
                ...newPost,
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
