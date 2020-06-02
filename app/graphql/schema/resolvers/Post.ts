import { Context } from "egg";
import { Arg, Ctx, Query, Resolver, Mutation } from "type-graphql";
import { Post } from "../types/Post";
import { IPostStatus } from '../../../types/post_interface';

@Resolver(() => Post)
export class PostResolver {
    constructor() { }

    @Query(() => [Post])
    async post(@Ctx() ctx: Context, @Arg("userId") userId: string, @Arg("page", { nullable: true }) page: number = 1, @Arg("size", { nullable: true }) size: number = 10) {
        let res = await ctx.service.post.getUserPostsByUserId(
            userId,
            page,
            size
        );
        const result: Post[] = [];
        for (const post of res) {
            result.push({
                ...post,
                status: 1,
                view_info: {
                    likeNum: post.likeNum,
                    liked: false,
                    marked: false
                },
                owner_info: {
                    userId: post.userId,
                    userName: "",
                    focused: false
                }
            });
        }
        return result;
    }

    @Mutation(() => Number)
    async likePost(@Arg("postId") postId: number, @Ctx() ctx: Context): Promise<number> {
        const userId: string = ctx.getUid();
        let isLiked: boolean = await ctx.service.post.getUserLikedPost(userId, postId)

        if (isLiked) {
            return 1;
        }
        await ctx.service.post.likePostByPostId(Number(postId), userId);
        return 0;
    }

    @Mutation(() => Number)
    async cancelLikePost(@Arg("postId") postId: number, @Ctx() ctx: Context): Promise<number> {
        return await ctx.service.post.cancelLikePostByPostId(
            Number(postId),
            ctx.getUid()
        );
    }


    @Mutation(() => Number)
    async markPost(@Arg("postId") postId: number, @Ctx() ctx: Context): Promise<number> {
        const userId: string = ctx.getUid();
        const isMark: boolean = await ctx.service.post.getUserMarkedPost(userId, Number(postId));
        if (isMark) {
            return 1
        }
        await ctx.service.post.markPostByPostId(Number(postId), userId);
        return 0
    }

    @Mutation(() => Number)
    async cancelMarkPost(@Arg("postId") postId: number, @Ctx() ctx: Context): Promise<number> {
        return await ctx.service.post.cancelMarkPostByPostId(Number(postId), ctx.getUid());
    }

    @Mutation(() => Number)
    async updatePostStatus(@Arg("postId") postId: number, @Arg("status") status: IPostStatus, @Ctx() ctx: Context): Promise<number> {
        return await ctx.service.post.updatePostStatus(Number(postId), status);
    }
}
