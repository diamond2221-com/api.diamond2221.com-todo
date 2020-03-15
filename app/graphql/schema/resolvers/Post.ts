import { Resolver, Query, Ctx, Arg } from 'type-graphql'
import { Post } from '../types/Post'
import { Context } from "egg";

@Resolver(() => Post)
export class PostResolver {
    constructor() { }

    @Query(() => [Post])
    async post(@Ctx() ctx: Context, @Arg("userId") userId: string) {
        return await ctx.service.post.getUserPostsByUserId(userId, 100, 1);
    }
}
