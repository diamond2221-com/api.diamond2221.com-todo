import { Context } from "egg";
import { Arg, Ctx, Query, Resolver, Mutation } from 'type-graphql';
import { User } from '../types/User';
import { IOtherUser, IOwnUser } from "../../../types/user_interface";

@Resolver(() => User)
export class UserResolver {
    @Query(() => User)
    async user(@Ctx() ctx: Context, @Arg("userId") userId: string): Promise<IOtherUser | IOwnUser | null> {
        const myUserId: string = ctx.getUid();

        let result: IOtherUser | IOwnUser | null = await ctx.service.user.getUserDetailInfo(userId, 'user_id', myUserId)
        if (!result) {
            result = await ctx.service.user.getUserDetailInfo(userId, 'user_name', myUserId)
        }
        return result;
        // return await ctx.model.User.getUserInfoByUserId(userId)
    }

    @Mutation(() => Number)
    async cancelFocusUser(@Ctx() ctx: Context, @Arg('userId') userId: string): Promise<number> {
        const myUserId: string = ctx.getUid();
        return await ctx.service.user.cancelFocusUserByUserId(userId, myUserId)
    }
}
