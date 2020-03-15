import { Resolver, Query, Ctx, Arg } from 'type-graphql'
import { User } from '../types/User'
import { Context } from "egg";

@Resolver(() => User)
export class UserResolver {
    constructor() {

    }

    @Query(() => User)
    async user(@Ctx() ctx: Context, @Arg("userId") userId: string): Promise<User | null> {
        return await ctx.model.User.getUserInfoByUserId(userId)
    }
}
