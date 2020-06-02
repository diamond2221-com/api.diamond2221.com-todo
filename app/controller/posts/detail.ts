import { Controller } from "egg"
import { IPost } from "../../types/post_interface";

export default class DetailController extends Controller {
    public async index() {
        const { ctx, service } = this;
        const rules = {
            postId: "string"
        }
        try {
            ctx.validate(rules, ctx.query);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

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
