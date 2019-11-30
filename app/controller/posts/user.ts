import { Controller } from "egg";

import { timestampToTime } from "../../utils/common";

import {
    BasePost,
    PostA,
    UserInfo
} from "../../types/post_interface";

export default class UserController extends Controller {
    /**
     * index
     * 获取用户帖子
     */
    public async index() {
        const { ctx, service } = this;
        const { page, size, userId } = ctx.query;
        // const userId = ctx.request.header["Client-Uid"];

        let posts: [BasePost] | [] = await service.post.getUserPostsByUserId(userId, Number(size), Number(page));

        let dealPosts: [PostA] | [] = await service.post.getPostInfo(posts);
        ctx.send(dealPosts, 200, "成功");
    }

    /**
  * 用户添加帖子
  */
    public async create() {
        const { ctx, service } = this;
        const { post } = service;
        const { content, imgs } = ctx.request.body;
        const userId = ctx.request.header["Client-Uid"];

        let newPost = await post.addPost(content, imgs, userId);
        const userInfo: UserInfo = await service.user.getUserInfoByUserId(newPost.userId);
        const result: PostA = {
            ...newPost,
            userName: userInfo.userName,
            userImg: userInfo.img,
            addTime: timestampToTime(newPost.addTime),
            comments: []
        }

        ctx.send(result, 200, "发帖成功");
    }
}
