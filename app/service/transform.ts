import { Service } from "egg";
import { Comment } from "../model/comment";
import { Comment as PostComment } from "../types/post_interface";

export default class TransFormService extends Service {
    public comment(comments: Comment[]): PostComment[] {
        return comments.map(comment => {
            return {
                id: comment.commentId,
                content: comment.content,
                rId: comment.rId,
                addTime: comment.addTime,
                postId: comment.postId,
                userId: comment.userId
            }
        })
    }
}
