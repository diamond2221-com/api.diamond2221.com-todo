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
     * @description 通过帖子Id 获取 帖子基本信息
     * @author ZhangYu
     * @date 2019-09-22
     * @param {number} postId
     * @memberof PostService
     */
    public async getPostByPostId(postId: number): Promise<BasePost | null> {
        const res = await this.app.model.Post.findOne({ where: { post_id: postId } })
        if(res) {
            return {
                postId: res.post_id,
                userId: res.user_id,
                content: res.content,
                addTime: res.add_time
            }
        } else {
            return null;
        }
    }

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

        const offset: number = (page - 1) * size;
        const sql = `
                    SELECT
                        p.post_id postId,
                        p.add_time addTime,
                        p.content content,
                        u.user_id userId,
                        u.img userImg,
                        u.user_name userName
                    FROM
                        tbl_post p
                    LEFT JOIN tbl_user u ON p.user_id = u.user_id
                    WHERE p.user_id = '${userId}'
                    ORDER BY p.add_time DESC
                    limit ${size}
                    OFFSET ${offset}
                    `
        const log = await this.app.mysql.query(sql)
        return log;
    }

    /**
     * 通过用户Id 获取收藏的帖子 (分页)
     * @param userId
     * @param size
     * @param page
     */
    public async getUserMarkPostsByUserId(
        userId: string,
        size: number,
        page: number
    ) {
        const res = await this.app.model.MarkPost.findAll({
            where: {
                user_id: userId
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size,
            attributes: ["post_id"]
        })
        return res.map(post => post.post_id);
    }

    /**
     * 通过用户Id 获取 发帖总数
     * @param userId
     */
    public async getUserPostsCountByUserId(
        userId: string
    ): Promise<number> {
        const res = await this.app.model.Post.count({ where: { user_id: userId } })
        return res;
    }
    /**
     * getUserPostsCountByUserId1
     */
    public async getUserPostsCountByUserId1(
        userId: string
    ): Promise<number> {
        return await this.app.model.Post.count({ where: { user_id: userId } })
    }

    /**
     * 通过帖子Id 获取 单个帖子图片
     * @param postId
     */
    public async getPostImgsByPostId(postId: number): Promise<string[]> {
        const res = await this.app.model.Img.findAll({ where: { post_id: postId }, order: [["add_time", "DESC"]] })
        return res.map(img => img.src + "?x-oss-process=image/auto-orient,1/interlace,1/quality,q_20/watermark,text_ZGlhbW9uZDIyMjEuY24,color_ffffff,size_10,shadow_100,x_1,y_1");
    }

    /**
     * 通过帖子Id 获取 单个帖子的评论 （分页）
     * @param postId
     * @param size
     * @param page
     */
    public async getPostCommentsByPostId(postId: number, size: number = 20, page: number = 1): Promise<PostComments[]> {
        const comments = await this.app.model.Comment.findAll({
            where: {
                post_id: postId
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })

        return comments.map(comment => {
            return {
                commentId: comment.comment_id,
                postId: comment.post_id,
                userId: comment.user_id,
                content: comment.content,
                addTime: comment.add_time
            };
        })

    }

    /**
     * 根据帖子Id 添加评论
     * @param postId
     * @param userId
     * @param content
     */
    public async addComments(postId: number, userId: string, content: string) {
        const comment = await this.app.model.Comment.create({
            post_id: postId,
            user_id: userId,
            content,
            add_time: Date.now()
        })
        return {
            userId: comment.user_id,
            postId: comment.post_id,
            content: comment.content,
            addTime: comment.add_time
        };
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
            user_id: userId,
            add_time: Date.now()
        }
        const res = await this.app.model.Post.create(post)
        const postId: number = res.post_id;
        if (imgs.length) {
            for (const img of imgs) {
                await this.app.model.Img.create({
                    post_id: postId,
                    src: img,
                    add_time: Date.now()
                })
            }
        }
        return {
            postId: res.post_id,
            userId: res.user_id,
            addTime: res.add_time,
            content: res.content,
            imgs: imgs.map(img => {
                return img + "?x-oss-process=image/auto-orient,1/interlace,1/quality,q_20/watermark,text_ZGlhbW9uZDIyMjEuY24,color_ffffff,size_10,shadow_100,x_1,y_1"
            })
        };
    }

    /**
     * @description 获取 所有帖子 (分页)
     * @author ZhangYu
     * @date 2019-09-03
     * @param {number} size
     * @param {number} page
     * @memberof PostService
     */
    public async getPosts(size: number, page: number): Promise<BasePost[]> {
        const posts = await this.app.model.Post.findAll({
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
        return posts.map(post => {
            return {
                postId: post.post_id,
                userId: post.user_id,
                content: post.content,
                addTime: post.add_time
            }
        })
    }


    /**
     * @description 获取帖子的点赞数量
     * @author ZhangYu
     * @date 2019-12-05
     * @param {number} postId
     * @memberof PostService
     */
    public async getPostLikeNums(postId: number): Promise<number> {
        return await this.app.model.Like.count({
            where: {
                post_id: postId
            }
        })
    }

    /**
     * @description 获取完整的帖子详情
     * @author ZhangYu
     * @date 2019-09-03
     * @param {BasePost} posts
     * @memberof PostService
     */
    public async getPostInfo(posts: Array<BasePost>) {
        let dealPosts: PostA[] = [];
        // this.app.logger.warn("帖子基本信息", posts)
        for (let post of posts) {
            // this.app.logger.warn("单个帖子基本信息", post)
            const imgs = await this.service.post.getPostImgsByPostId(post.postId);
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
            const likeNum: number = await this.service.post.getPostLikeNums(post.postId);
            dealPosts = [
                ...dealPosts,
                {
                    ...post,
                    imgs,
                    userName: userInfo.userName,
                    userImg: userInfo.img,
                    comments: dealComments,
                    addTime: timestampToTime(Number(post.addTime)),
                    likeNum
                }
            ]

        }
        return dealPosts;
    }

}
