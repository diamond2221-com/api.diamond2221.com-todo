import { Service } from "egg";
import { timestampToTime } from "../utils/common";
import {
    BasePost,
    PostComments,
    PostA,
    IPostComment,
    UserInfo
} from "../types/post_interface";




export default class PostService extends Service {
    /**
     * 通过用户Id 获取 帖子 (分页)
     * @param userId
     * @param size
     * @param page
     */
    public async getUserPostsByUserId(
        userId: string,
        size: number,
        page: number
    ) {
        const res = await this.app.mysql.select("tbl_post", {
            where: {
                userId
            },
            orders: [["addTime", "desc"]],
            limit: size,
            offset: (page - 1) * size
        });
        return res;
    }

    /**
     * 通过用户Id 获取 发帖总数
     * @param userId
     */
    public async getUserPostsCountByUserId(
        userId: string
    ) {
        const res = await this.app.mysql.count("tbl_post", {
            userId
        });
        return res;
    }

    /**
     * 通过帖子Id 获取 单个帖子图片
     * @param postId
     */
    public async getPostImgsByPostId(postId: number) {
        const res = await this.app.mysql.select("tbl_img", {
            where: {
                postId
            },
            orders: [["addTime", "desc"]]
        });
        return res.map(img => img.src + "?x-oss-process=image/auto-orient,1/interlace,1/quality,q_20/watermark,text_ZGlhbW9uZDIyMjEuY24,color_ffffff,size_10,shadow_100,x_1,y_1");
    }

    /**
     * 通过帖子Id 获取 单个帖子的评论 （分页）
     * @param postId
     * @param size
     * @param page
     */
    public async getPostCommentsByPostId(postId: number, size: number = 20, page: number = 1): Promise<PostComments[]> {
        const comments = await this.app.mysql.select("tbl_comment", {
            where: {
                postId
            },
            orders: [["addTime", "desc"]],
            limit: size,
            offset: (page - 1) * size

        })
        return comments;
    }

    /**
     * 根据帖子Id 添加评论
     * @param postId
     * @param userId
     * @param content
     */
    public async addComments(postId: number, userId: string, content: string) {
        const comment = {
            postId,
            userId,
            content,
            addTime: Date.now()
        }
        await this.app.mysql.insert("tbl_comment", comment);
        return comment;
    }


    /**
     * 用户添加帖子
     * @param content
     * @param imgs
     * @param userId
     */
    public async addPost(content: string, imgs: string[], userId: string) {
        const post = {
            content,
            userId,
            addTime: Date.now()
        }
        const res = await this.app.mysql.insert("tbl_post", post);
        const postId: number = res.insertId;
        if (imgs.length) {
            for (const img of imgs) {
                await this.app.mysql.insert("tbl_img", {
                    postId,
                    src: img,
                    addTime: Date.now()
                })
            }
        }
        return { ...post, imgs: imgs.map(img => img + "?x-oss-process=image/auto-orient,1/interlace,1/quality,q_20/watermark,text_ZGlhbW9uZDIyMjEuY24,color_ffffff,size_10,shadow_100,x_1,y_1"), postId };
    }

    /**
     * @description 获取 所有帖子 (分页)
     * @author ZhangYu
     * @date 2019-09-03
     * @param {number} size
     * @param {number} page
     * @memberof PostService
     */
    public async getPosts(size: number, page: number) {
        return await this.app.mysql.select("tbl_post", {
            orders: [["addTime", "desc"]],
            limit: size,
            offset: (page - 1) * size
        });
        // return res;
    }

    /**
     * @description 获取完整的帖子详情
     * @author ZhangYu
     * @date 2019-09-03
     * @param {BasePost} posts
     * @memberof PostService
     */
    public async getPostInfo(posts: Array<BasePost>) {
        let dealPosts: [PostA] | [] | any = [];
        for (let post of posts) {
            const imgs: [string] | [] = await this.service.post.getPostImgsByPostId(post.postId);
            const userInfo: UserInfo = await this.service.user.getUserInfoByUserId(post.userId);

            let dealComments: IPostComment[] = [];
            const comments = await this.service.post.getPostCommentsByPostId(post.postId, 20, 1);

            for (const comment of comments) {
                let userInfo: UserInfo = await this.service.user.getUserInfoByUserId(comment.userId);
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
        return dealPosts;
    }

}
