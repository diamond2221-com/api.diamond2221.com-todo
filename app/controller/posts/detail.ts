import { Controller } from "egg"
import { IPost } from "../../types/post_interface";
import { CheckParams } from '../../utils/decorators';

export default class DetailController extends Controller {
    @CheckParams({ postId: "string" }, "query")
    public async index() {
        const { ctx, service } = this;
        const postId: number = ctx.query.postId;
        const userId: string = ctx.getUid();
        let detailPost: IPost[] | null = null;
        const post = await this.app.model.Post.fetchPostByPostId(postId);

        if (post) {
            if (post.status === 1 || post.status === 2 && post.userId == userId) {
                detailPost = await service.post.getPostsDetail([post], userId);
                return ctx.send(detailPost[0]);
            } else {
                return ctx.send("找不到帖子了", 400)
            }
        } else {
            return ctx.send("找不到帖子了", 400)
        }
    }
}
