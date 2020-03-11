import { Service } from "egg"
import { IPostComments, BaseComment, IPostComment, IPostCommentRes } from "../types/post_interface";
import { timestampToTime } from "../utils/common";
import { User } from "../model/user";

export default class CommentService extends Service {

    /**
     * 通过帖子Id 获取 单个帖子的评论 （分页）
     * @param postId
     * @param size
     * @param page
     */
    public async getPostComments(postId: number, page: number = 1, size: number = 18): Promise<IPostCommentRes> {
        // const postService = this.service.post;
        const commentService = this.service.comment;

        let parentComments = await commentService.getPostCommentsParentByPostId(postId, page, size)


        let edges: IPostComments[] = [];

        for (const comment of parentComments.rows) {
            const childComments = await commentService.getPostCommentsChildByPostId(postId, comment.id, page, size)
            let child: IPostComment[] = [];

            for (const childComment of childComments.rows) {
                child.push(await commentService.transFormComment(childComment));
            }
            edges.push({
                ...(await commentService.transFormComment(comment)),
                edges: {
                    count: childComments.count,
                    edges: child
                }
            })
        }

        return {
            edges,
            count: parentComments.count
        }
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


    public async getPostCommentsParentByPostId(postId: number, page: number = 1, size: number = 20) {
        const comments = await this.app.model.Comment.fetchPostParentComments(postId, size, page);
        return {
            rows: this.service.transform.comment(comments.rows),
            count: comments.count
        };
    }

    public async getPostCommentsChildByPostId(postId: number, rId: number, page: number = 1, size: number = 20) {
        const comments = await this.app.model.Comment.fetchPostChildComments(postId, rId, size, page);

        return {
            rows: this.service.transform.comment(comments.rows),
            count: comments.count
        };
    }
}
