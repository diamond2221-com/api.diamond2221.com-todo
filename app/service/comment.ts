import { Service } from "egg";
import { Comment } from "../model/comment";
import { User } from "../model/user";
import { BaseComment, IPostComment, IPostCommentRes, IPostComments } from "../types/post_interface";
import { timestampToTime } from "../utils/common";

export default class CommentService extends Service {

    /**
     * 通过帖子Id 获取 单个帖子的评论 （分页）
     * @param postId
     * @param size
     * @param page
     */
    public async getPostComments(postId: number, rId: number, page: number = 1, size: number = 18): Promise<IPostCommentRes> {
        // const postService = this.service.post;
        const commentService = this.service.comment;

        let parentComments = await commentService.getPostCommentsByPostId(postId, rId, page, size)


        let edges: IPostComments[] = [];

        for (const comment of parentComments.rows) {
            const childComments = await commentService.getPostCommentsByPostId(postId, comment.id, rId ? page : 1, rId ? size : 3)

            edges.push({
                ...comment,
                edges: {
                    count: childComments.count,
                    edges: childComments.rows
                }
            })
        }
        return {
            edges: {
                edges,
                count: parentComments.count,
            },
            count: await commentService.getPostCommentCount(postId)
        }
    }

    public async getPostCommentCount(postId: number): Promise<number> {
        return await this.app.model.Comment.getPostCommentSize(postId);
    }

    public async getPostCommentsByPostId(postId: number, rId: number = 0, page: number = 1, size: number = 3) {
        const commentService = this.service.comment;
        const comments = await this.app.model.Comment.fetchPostComments(postId, rId, size, page);
        let dealComments: IPostComment[] = [];

        for (const childComment of comments.rows) {
            dealComments.push(await commentService.transFormComment(childComment));
        }
        return {
            rows: dealComments,
            count: comments.count
        };
    }

    public async transFormComment(comment: BaseComment): Promise<IPostComment> {
        const userService = this.service.user;
        const userInfo: User = await userService.getUserInfoByUserId(comment.userId) as User;
        return {
            ...comment,
            userName: userInfo.userName,
            userImg: userInfo.img,
            addTime: timestampToTime(Number(comment.addTime))
        }
    }

    /**
     * 根据帖子Id 添加评论
     * @param postId
     * @param userId
     * @param content
     */
    public async addComments(postId: number, userId: string, content: string, rId: number, pId: number): Promise<Comment> {
        const comment = await this.app.model.Comment.createComment(postId, userId, content, rId, pId);
        return comment;
    }
}
