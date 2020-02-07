import { Controller } from "egg";

import { timestampToTime } from "../../utils/common";

import {
    PostAllInfo,
    UserInfo
} from "../../types/post_interface";

export default class UserController extends Controller {
    /**
     * index
     * 获取用户帖子
     */
    public async index() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            page: "number",
            size: "number",
            userId: "string",
        };
        try {
            ctx.validate(rules, ctx.query);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const { page, size, userId } = ctx.query;
        const user_id = ctx.request.header["client-uid"];

        let dealPosts: PostAllInfo[] = await service.post.getUserPostsByUserId(userId, user_id, size, page);
        ctx.send(dealPosts);
    }

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
        const userInfo: UserInfo = await service.user.getUserInfoByUserId(newPost.userId);
        const result: PostAllInfo = {
            ...newPost,
            userName: userInfo.userName,
            userImg: userInfo.img,
            addTime: timestampToTime(newPost.addTime),
            comments: [],
            likeNum: 0,
            marked: false,
            liked: false
        }

        ctx.send(result, 200, "发帖成功");
    }
}
