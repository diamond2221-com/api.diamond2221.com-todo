import { Service } from "egg";
import { Comment } from "../model/comment";
import { BaseComment as PostComment } from "../types/post_interface";

export default class TransFormService extends Service {
    public comment(comments: Comment[]): PostComment[] {
        return comments
    }
}
