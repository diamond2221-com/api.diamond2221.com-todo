import { timestampToTime } from "../utils/common";
import { Controller } from 'egg';
import {
    BasePost,
    PostA,
    UserInfo
} from "../types/post_interface";

export default class PostController extends Controller {
    /**
     * getUserPosts
     * 获取用户帖子
     */
    public async getUserPosts() {
        const { ctx, service } = this;
        const { page, size, userId } = ctx.query;

        let posts: [BasePost] | [] = await service.post.getUserPostsByUserId(userId, Number(size), Number(page));

        let dealPosts: [PostA] | [] = await service.post.getPostInfo(posts);
        // let dealPosts: [PostA] | [] | any = [];
        // {
        //     for (let post of posts) {
        //         const imgs: [string] | [] = await service.post.getPostImgsByPostId(post.postId);
        //         const userInfo: UserInfo = await service.user.getUserInfoByUserId(post.userId);

        //         let dealComments: IPostComment[] = [];
        //         const comments = await service.post.getPostCommentsByPostId(post.postId, 20, 1);

        //         for (const comment of comments) {
        //             let userInfo: UserInfo = await service.user.getUserInfoByUserId(comment.userId);
        //             dealComments = [
        //                 ...dealComments,
        //                 {
        //                     content: comment.content,
        //                     id: comment.commentId,
        //                     userName: userInfo.userName,
        //                     useId: userInfo.userId,
        //                     addTime: timestampToTime(Number(comment.addTime))
        //                 }
        //             ]

        //         }
        //         dealPosts = [
        //             ...dealPosts,
        //             {
        //                 ...post,
        //                 imgs,
        //                 userName: userInfo.userName,
        //                 userImg: userInfo.img,
        //                 comments: dealComments,
        //                 addTime: timestampToTime(Number(post.addTime)),
        //                 likeNum: 0
        //             }
        //         ]

        //     }
        // }

        ctx.send(dealPosts, 200, "成功");
    }


    /**
     * 添加帖子评论
     */
    public async addComments() {
        const { ctx, service } = this;
        const { content, userId, postId } = ctx.request.body;

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

    /**
     * 用户添加帖子
     */
    public async addPost() {
        const { ctx, service } = this;
        const { post } = service;
        const { content, userId, imgs } = ctx.request.body;
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

    /**
     * @description 获取所有帖子 按日期降序
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof PostController
     */
    public async allPosts() {
        const { ctx, service } = this;
        const { page, size } = ctx.query;

        let posts: [BasePost] | [] = await service.post.getPosts(Number(size), Number(page));

        let dealPosts: [PostA] | [] = await service.getPostInfo(posts);
        ctx.send(dealPosts, 200);
    }
}


