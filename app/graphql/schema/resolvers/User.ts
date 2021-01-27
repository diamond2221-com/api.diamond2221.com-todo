import { Context } from 'egg'
import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { User } from '../types/User';

@Resolver(() => User)
export class UserResolver {
    @Query(() => User)
    public async user(@Ctx() ctx: Context, @Arg('id') id: number) {
        const user = await ctx.model.User.getUser(id)
        if (!user) {
            throw new Error('没有该用户！')
        }
        return user
    }
}
