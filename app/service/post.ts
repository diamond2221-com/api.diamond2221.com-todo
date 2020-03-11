import { Service } from "egg";
import { timestampToTime } from "../utils/common";
import { IBasePost, PostAllInfo } from "../types/post_interface";
// import { IUserInfo } from "../types/user_interface"
import { User } from "../model/user";
import { Post } from "../model/post";
import { Comment } from "../model/comment";


export default class PostService extends Service {
    /**
     * @description 通过帖子Id 获取多个帖子基本信息
     * @author ZhangYu
     * @date 2020-02-07
     * @param {number[]} postIds
     * @returns {(Promise<IBasePost | null>)}
     * @memberof PostService
     */
    public async getPostsByPostId(postIds: number[]) {
        return await this.app.model.Post.fetchPostsOpInPostIds(postIds);
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
        const posts: IBasePost[] = await this.app.mysql.query(sql)
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
        const res = await this.app.model.MarkPost.fetchUserMarkPostsByUserId(userId, size, page)
        const postIds: number[] = res.map(post => post.postId);
        let basePosts: Post[] = await this.service.post.getPostsByPostId(postIds);
        let sortBasePosts: Post[] = [];
        for (let index = 0; index < postIds.length; index++) {
            const basePost = basePosts.find(post => post.postId === postIds[index]);
            if (basePost) {
                sortBasePosts.push(basePost)
            }
        }
        const posts: PostAllInfo[] = await this.service.post.getPostsInfo(sortBasePosts, userId)
        return posts
    }

    /**
     * 通过用户Id 获取 发帖总数
     * @param userId
     */
    public async getUserPostsCountByUserId(userId: string): Promise<number> {
        const res = await this.app.model.Post.countUserPostsByUserId(userId);
        return res;
    }

    /**
     * 通过帖子Id 获取 单个帖子图片
     * @param postId
     */
    public async getPostImgsByPostId(postId: number): Promise<string[]> {
        const res = await this.app.model.Img.fetchPostAllImgs(postId);
        return res.map(img => img.src + this.app.config.postImgConf);
    }


    public async getPostCommentsParentByPostId(postId: number, size: number = 20, page: number = 1) {
        const comments = await this.app.model.Comment.fetchPostParentComments(postId, size, page);
        return {
            rows: this.service.transform.comment(comments.rows),
            count: comments.count
        };
    }

    public async getPostCommentsChildByPostId(postId: number, rId: number, size: number = 20, page: number = 1) {
        const comments = await this.app.model.Comment.fetchPostChildComments(postId, rId, size, page);

        return {
            rows: this.service.transform.comment(comments.rows),
            count: comments.count
        };
    }

    /**
     * 根据帖子Id 添加评论
     * @param postId
     * @param userId
     * @param content
     */
    public async addComments(postId: number, userId: string, content: string, rId: number, pId: number): Promise<Comment> {
        return await this.app.model.Comment.createComment(postId, userId, content, rId, pId)
    }


    /**
     * 用户添加帖子
     * @param content
     * @param imgs
     * @param userId
     */
    public async addPost(content: string, imgs: string[], userId: string) {
        const res = await this.app.model.Post.createPost(content, userId);
        const postId: number = res.postId;
        if (imgs.length) {
            for (const img of imgs) {
                await this.app.model.Img.createImg(postId, img)
            }
        }
        return {
            postId: res.postId,
            content: res.content,
            userId: res.userId,
            addTime: res.addTime,
            imgs: imgs.map(img => {
                return img + this.app.config.postImgConf
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
    public async getPosts(size: number, page: number) {
        return await this.app.model.Post.fetchAllPosts(page, size);
    }


    /**
     * @description 获取帖子的点赞数量
     * @author ZhangYu
     * @date 2019-12-05
     * @param {number} postId
     * @memberof PostService
     */
    public async getPostLikeNums(postId: number): Promise<number> {
        return await this.app.model.LikePost.countLikePost(postId);
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
        const res = await LikePost.getUserLikePost(user_id, post_id);
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
        let result = await this.app.model.MarkPost.getUserMarkPosst(userId, postId);
        return Boolean(result)
    }


    /**
     * @description 获取单个帖子的基本信息
     * @author ZhangYu
     * @date 2020-02-08
     * @param {number} post_id
     * @returns {Promise<IBasePost>}
     * @memberof PostService
     */
    public async getBasePost(post_id: number) {
        const PostModel = this.app.model.Post;
        return await PostModel.fetchPostByPostId(post_id) as Post;
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
        const commentService = this.service.comment;
        const post = await postService.getBasePost(post_id);
        if (post) {

            let dealPosts: PostAllInfo;
            const imgs = await postService.getPostImgsByPostId(post.postId);
            const userInfo: User = await userService.getUserInfoByUserId(post.userId) as User;

            const comments = await commentService.getPostComments(post.postId, 1, 20);

            // for (const comment of comments.edges) {
            //     let userInfo: User = await userService.getUserInfoByUserId(comment.userId) as User;
            //     dealComments = [
            //         ...dealComments,
            //         {
            //             content: comment.content,
            //             id: comment.id,
            //             userName: userInfo.userName,
            //             userId: userInfo.userId,
            //             userImg: userInfo.img,
            //             addTime: timestampToTime(Number(comment.addTime))
            //         }
            //     ]

            // }
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
                comments,
                addTime: timestampToTime(Number(post.addTime)),
                likeNum,
                liked,
                marked,
                focused
            }
            return dealPosts;
        } else {
            return null
        }

    }

    /**
     * @description 获取多个完整的帖子详情
     * @author ZhangYu
     * @date 2019-09-03
     * @param {IBasePost} posts
     * @param {string} user_id  当前登录人的userId
     * @memberof PostService
     */
    public async getPostsInfo(posts: Array<IBasePost>, user_id: string) {
        const postService = this.service.post;
        const userService = this.service.user;
        const commentService = this.service.comment;
        let dealPosts: PostAllInfo[] = [];
        for (let post of posts) {
            this.app.logger.info("单个帖子基本信息", post)
            const imgs = await postService.getPostImgsByPostId(post.postId);
            const userInfo: User = await userService.getUserInfoByUserId(post.userId) as User;

            const comments = await commentService.getPostComments(post.postId, 1, 20);
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
                    comments,
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
        await this.app.model.MarkPost.createUserMarkPost(postId, userId);
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
        await this.app.model.MarkPost.delUserMarkPost(postId, userId);
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
        await this.app.model.LikePost.createUserLikePost(postId, userId);
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
        await this.app.model.LikePost.delUserLikePost(postId, userId);
    }

    public async getPostsByUserId(user_id: string, userIds: string[], page: number, size: number): Promise<PostAllInfo[]> {
        const postModel = this.app.model.Post;
        const postService = this.service.post;
        const posts = await postModel.fetchPostsOpInUserId(userIds, size, page)
        const detailPosts: PostAllInfo[] = await postService.getPostsInfo(posts, user_id);
        return detailPosts
    }
}
