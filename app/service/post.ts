import { Service } from "egg";
import { timestampToTime } from "../utils/common";
import { BasePost, PostComment, PostAllInfo, IPostComment, UserInfo } from "../types/post_interface";
import { Op } from "sequelize"


export default class PostService extends Service {
    /**
     * @description 通过帖子Id 获取多个帖子基本信息
     * @author ZhangYu
     * @date 2020-02-07
     * @param {number[]} postIds
     * @returns {(Promise<BasePost | null>)}
     * @memberof PostService
     */
    public async getPostsByPostId(postIds: number[]): Promise<BasePost[]> {
        const res = await this.app.model.Post.findAll({
            where: {
                post_id: {
                    [Op.in]: postIds
                }
            }
        })
        return res.map(post => {
            return {
                postId: post.post_id,
                userId: post.user_id,
                content: post.content,
                addTime: post.add_time
            }
        })
    }

    /**
     * 通过用户Id 获取 帖子 (分页)
     * @param userId1 获取该用户的帖子
     * @param userId2 当前登录人的id
     * @param size
     * @param page
     */
    public async getUserPostsByUserId(userId1: string, userId2: string, size: number, page: number): Promise<PostAllInfo[]> {
        // const res = await this.app.model.Post.findAll({
        //     where: {
        //         user_id: userId1
        //     },
        //     order: [["add_time", "desc"]],
        //     limit: size,
        //     offset: (page - 1) * size
        // })
        const offset: number = (page - 1) * size;
        const sql = `
                    SELECT
                        p.post_id postId,
                        p.add_time addTime,
                        p.content content,
                        u.user_id userId,
                        u.img img,
                        u.user_name userName
                    FROM
                        tbl_post p
                    LEFT JOIN tbl_user u ON p.user_id = u.user_id
                    WHERE p.user_id = '${userId1}'
                    ORDER BY p.add_time DESC
                    limit ${size}
                    OFFSET ${offset}
                    `
        const posts: BasePost[] = await this.app.mysql.query(sql)
        let dealPosts: PostAllInfo[] = await this.service.post.getPostsInfo(posts, userId2);
        return dealPosts;
    }

    /**
     * 通过用户Id 获取收藏的帖子 (分页)
     * @param userId
     * @param size
     * @param page
     */
    public async getUserMarkPostsByUserId(userId: string, size: number, page: number) {
        const res = await this.app.model.MarkPost.findAll({
            where: {
                user_id: userId
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size,
            attributes: ["post_id"]
        })
        const basePosts = await this.service.post.getPostsByPostId(res.map(post => post.post_id));
        const posts: PostAllInfo[] = await this.service.post.getPostsInfo(basePosts, userId)
        return posts
    }

    /**
     * 通过用户Id 获取 发帖总数
     * @param userId
     */
    public async getUserPostsCountByUserId(userId: string): Promise<number> {
        const res = await this.app.model.Post.count({ where: { user_id: userId } })
        return res;
    }
    /**
     * getUserPostsCountByUserId1
     */
    public async getUserPostsCountByUserId1(userId: string): Promise<number> {
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
    public async getPostCommentsByPostId(postId: number, size: number = 20, page: number = 1): Promise<PostComment[]> {
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
            id: comment.id,
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
        return await this.app.model.LikePost.count({
            where: {
                post_id: postId
            }
        })
    }

    /**
     * @description 查询用户是否已经喜欢该贴子
     * @author ZhangYu
     * @date 2020-02-07
     * @private
     * @param {string} user_id
     * @param {string} post_id
     * @returns {Promise<boolean>}
     * @memberof PostService
     */
    public async getUserLikedPost(user_id: string, post_id: number): Promise<boolean> {
        const { LikePost } = this.app.model;
        const res = await LikePost.count({ where: { user_id, post_id } })
        return Boolean(res);
    }


    /**
     * @description 查看是否已收藏该帖子
     * @author ZhangYu
     * @date 2019-09-22
     * @param {string} userId
     * @param {number} postId
     * @returns {Promise<boolean>}
     * @memberof UserService
     */
    public async getUserMarkedPost(userId: string, postId: number): Promise<boolean> {
        let result = await this.app.model.MarkPost.findOne({ where: { post_id: postId, user_id: userId } })
        return Boolean(result)
    }

    public async getPostUserFocusedUser(user_id: string, focus_user_id: string): Promise<boolean> {
        const { Focus } = this.app.model;
        const res = await Focus.count({
            where: {
                user_id,
                focus_user_id
            }
        })
        return Boolean(res);
    }


    /**
     * @description 获取单个帖子的基本信息
     * @author ZhangYu
     * @date 2020-02-08
     * @param {number} post_id
     * @returns {Promise<BasePost>}
     * @memberof PostService
     */
    public async getBasePost(post_id: number): Promise<BasePost> {
        const { Post } = this.app.model;
        const post = await Post.findOne({
            where: {
                post_id
            }
        })
        if (post) {
            return {
                postId: post.post_id,
                userId: post.user_id,
                content: post.content,
                addTime: post.add_time,
            }
        } else {
            return {
                postId: 0,
                userId: "",
                content: "",
                addTime: ""
            }
        }
    }

    /**
     * @description 获取单个完整的帖子详情
     * @author ZhangYu
     * @date 2019-09-03
     * @param {number} post_id
     * @param {string} user_id  当前登录人的userId
     * @memberof PostService
     */
    public async getPostInfo(post_id: number, user_id: string) {
        const postService = this.service.post;
        const userService = this.service.user;
        const post = await postService.getBasePost(post_id);
        let dealPosts: PostAllInfo;
        const imgs = await postService.getPostImgsByPostId(post.postId);
        const userInfo: UserInfo = await userService.getUserInfoByUserId(post.userId);

        let dealComments: IPostComment[] = [];
        const comments = await postService.getPostCommentsByPostId(post.postId, 20, 1);

        for (const comment of comments) {
            let userInfo: UserInfo = await userService.getUserInfoByUserId(comment.userId);
            dealComments = [
                ...dealComments,
                {
                    content: comment.content,
                    id: comment.commentId,
                    userName: userInfo.userName,
                    userId: userInfo.userId,
                    userImg: userInfo.img,
                    addTime: timestampToTime(Number(comment.addTime))
                }
            ]

        }
        const likeNum: number = await postService.getPostLikeNums(post.postId);
        const liked: boolean = await postService.getUserLikedPost(user_id, post.postId);
        const marked: boolean = await postService.getUserMarkedPost(user_id, post.postId);
        const focused: boolean = await userService.floowedByUserId(post.userId, user_id)
        dealPosts =
        {
            ...post,
            imgs,
            userName: userInfo.userName,
            img: userInfo.img,
            comments: dealComments,
            addTime: timestampToTime(Number(post.addTime)),
            likeNum,
            liked,
            marked,
            focused
        }

        return dealPosts;
    }

    /**
     * @description 获取多个完整的帖子详情
     * @author ZhangYu
     * @date 2019-09-03
     * @param {BasePost} posts
     * @param {string} user_id  当前登录人的userId
     * @memberof PostService
     */
    public async getPostsInfo(posts: Array<BasePost>, user_id: string) {
        const postService = this.service.post;
        const userService = this.service.user;
        let dealPosts: PostAllInfo[] = [];
        // this.app.logger.warn("帖子基本信息", posts)
        for (let post of posts) {
            // this.app.logger.warn("单个帖子基本信息", post)
            const imgs = await postService.getPostImgsByPostId(post.postId);
            const userInfo: UserInfo = await userService.getUserInfoByUserId(post.userId);

            let dealComments: IPostComment[] = [];
            const comments = await postService.getPostCommentsByPostId(post.postId, 20, 1);

            for (const comment of comments) {
                let userInfo: UserInfo = await userService.getUserInfoByUserId(comment.userId);
                dealComments = [
                    ...dealComments,
                    {
                        content: comment.content,
                        id: comment.commentId,
                        userName: userInfo.userName,
                        userId: userInfo.userId,
                        userImg: userInfo.img,
                        addTime: timestampToTime(Number(comment.addTime))
                    }
                ]

            }
            const likeNum: number = await postService.getPostLikeNums(post.postId);
            const liked: boolean = await postService.getUserLikedPost(user_id, post.postId);
            const marked: boolean = await postService.getUserMarkedPost(user_id, post.postId);
            const focused: boolean = await userService.floowedByUserId(post.userId, user_id)
            dealPosts = [
                ...dealPosts,
                {
                    ...post,
                    imgs,
                    userName: userInfo.userName,
                    img: userInfo.img,
                    comments: dealComments,
                    addTime: timestampToTime(Number(post.addTime)),
                    likeNum,
                    liked,
                    marked,
                    focused
                }
            ]

        }
        return dealPosts;
    }


    /**
     * @description 收藏帖子 通过帖子Id
     * @author ZhangYu
     * @date 2019-09-03
     * @param {number} postId
     * @param {string} userId
     * @memberof PostService
     */
    public async markPostByPostId(postId: number, userId: string) {
        await this.app.model.MarkPost.create({ post_id: postId, user_id: userId, add_time: Date.now() })
    }

    /**
     * @description 取消收藏帖子 通过帖子Id
     * @author ZhangYu
     * @date 2020-02-09
     * @param {number} postId
     * @param {string} userId
     * @memberof PostService
     */
    public async cancelMarkPostByPostId(postId: number, userId: string) {
        await this.app.model.MarkPost.destroy({ where: { post_id: postId, user_id: userId } })
    }

    /**
     * @description 喜欢帖子 通过帖子Id
     * @author ZhangYu
     * @date 2020-02-07
     * @param {number} postId
     * @param {string} userId
     * @memberof PostService
     */
    public async likePostByPostId(postId: number, userId: string) {
        await this.app.model.LikePost.create({ post_id: postId, user_id: userId, add_time: Date.now() })
    }

    /**
     * @description 取消喜欢帖子 通过帖子Id
     * @author ZhangYu
     * @date 2020-02-08
     * @param {number} postId
     * @param {string} userId
     * @memberof PostService
     */
    public async cancelLikePostByPostId(postId: number, userId: string) {
        await this.app.model.LikePost.destroy({ where: { post_id: postId, user_id: userId } })
    }

    public async getPostsByUserId(user_id: string, userIds: string[], page: number, size: number): Promise<PostAllInfo[]> {
        const postModel = this.app.model.Post;
        const postService = this.service.post;
        const posts = await postModel.findAll({
            where: {
                user_id: {
                    [Op.in]: userIds
                }
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
        let basePosts: BasePost[] = posts.map(post => {
            return {
                postId: post.post_id,
                userId: post.user_id,
                content: post.content,
                addTime: post.add_time
            }
        })
        const detailPosts: PostAllInfo[] = await postService.getPostsInfo(basePosts, user_id);
        return detailPosts
    }
}
