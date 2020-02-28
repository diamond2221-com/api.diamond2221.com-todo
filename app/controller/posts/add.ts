import { Controller } from "egg";

import { timestampToTime } from "../../utils/common";

import { PostAllInfo } from "../../types/post_interface";
import { IUserInfo } from "../../types/user_interface";

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
        const userInfo: IUserInfo = await service.user.getUserInfoByUserId(newPost.userId) as IUserInfo;
        /* TODO */
        const focused: boolean = false;
        const result: PostAllInfo = {
            ...newPost,
            userName: userInfo.userName,
            img: userInfo.img,
            addTime: timestampToTime(newPost.addTime),
            comments: [],
            likeNum: 0,
            marked: false,
            liked: false,
            focused
        }

        ctx.send(result, 200, "发帖成功");
    }
}
