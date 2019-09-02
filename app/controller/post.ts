import { timestampToTime } from "../utils/common";
import { Controller } from 'egg';

export interface Post {
    postId: number;
    userId: string;
    content: string;
    addTime: string;
}

export interface PostA extends Post {
    imgs?: string[];
    userName?: string;
    userImg: string;
    comments: IPostComment[];
    likeNum?: number;
}
export interface IPostComment {
    content: string;
    id: number;
    userName: string;
    useId: string;
    addTime: string;
}


interface UserInfo {
    addTime: string;
    badge: number;
    img: string;
    name: string | null;
    password: string;
    signature: string | null;
    userId: string;
    userName: string;
    website: string | null;
    lastTime: string;
}

export default class PostController extends Controller {
    /**
     * getUserPosts
     * 获取用户帖子
     */
    public async getUserPosts() {
        const { ctx, service } = this;
        const { page, size, userId } = ctx.query;

        let posts: [Post] | [] = await service.post.getUserPostsByUserId(userId, Number(size), Number(page));


        let dealPosts: [PostA] | [] | any = [];
        {
            for (let post of posts) {
                const imgs: [string] | [] = await service.post.getUserPostImgsByPostId(post.postId);
                const userInfo: UserInfo = await service.user.getUserInfoByUserId(post.userId);

                let dealComments: IPostComment[] = [];
                const comments = await service.post.getUserPostCommentsByPostId(post.postId, 20, 1);

                for (const comment of comments) {
                    let userInfo: UserInfo = await service.user.getUserInfoByUserId(comment.userId);
                    dealComments = [
                        ...dealComments,
                        {
                            content: comment.content,
                            id: comment.commentId,
                            userName: userInfo.userName,
                            useId: userInfo.userId,
                            addTime: timestampToTime(Number(comment.addTime))
                        }
                    ]

                }
                dealPosts = [
                    ...dealPosts,
                    {
                        ...post,
                        imgs,
                        userName: userInfo.userName,
                        userImg: userInfo.img,
                        comments: dealComments,
                        addTime: timestampToTime(Number(post.addTime)),
                        likeNum: 0
                    }
                ]

            }
        }

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
}


