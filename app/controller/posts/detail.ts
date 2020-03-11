import { Controller } from "egg"
import { PostAllInfo } from "../../types/post_interface";

export default class DetailController extends Controller {
    public async index() {
        const { ctx, /* service */ } = this;
        const rules = {
            postId: "string"
        }
        try {
            ctx.validate(rules, ctx.query);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const postId: number = ctx.query.postId;
        const userId: string = ctx.request.header["client-uid"]
        const detailPost: PostAllInfo | null = await this.service.post.getPostInfo(postId, userId)
        if (detailPost) {
            return ctx.send(detailPost)
        } else {
            ctx.send("找不到帖子了", 400)
        }
    }
}
