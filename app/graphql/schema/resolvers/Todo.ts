import { Context } from "egg";
import { Arg, Ctx, Query, Resolver, Mutation } from "type-graphql";
import { TodoResult, Todo } from '../types/Todo';
import { TodoStatus } from "../../../types/todo"

@Resolver(Todo)
export class TodoResolver {
    constructor() { }

    @Query(() => Todo)
    async todo(
        @Ctx() ctx: Context,
        @Arg("id") id: number,
    ) {
        const res = await ctx.model.Todo.findTodo(id)
        if (!res) {
            throw new Error('没有找到该条Todo');
        }
        return res
    }

    @Query(() => TodoResult)
    async todos(
        @Ctx() ctx: Context,
        @Arg("page") page: number = 1,
        @Arg("size") size: number = 10,
        @Arg('orderType', {
            defaultValue: 1, validate: true
        }) orderType: TodoStatus
    ) {
        return await ctx.model.Todo.fetchAllAndCount(page, size, orderType)
    }

    @Mutation(() => Number)
    async update(@Arg("id") id: number, @Arg("name") name: string, @Arg("desc") desc: string, @Arg('expirTime') expirTime: number, @Ctx() ctx: Context): Promise<number> {
        const res = await ctx.model.Todo.updateTodo(id, name, desc, expirTime)
        if (res[0] === 0) {
            throw new Error('没有找到该条Todo');
        }
        return res[0]
    }

    @Mutation(() => Number)
    async delete(@Arg("id") id: number, @Ctx() ctx: Context): Promise<number> {
        const res = await ctx.model.Todo.updateDelete(id)
        return res[0];
    }

    @Mutation(() => [Todo, Boolean])
    async create(@Arg("name") name: string, @Arg("desc") desc: string, @Arg('expirTime') expirTime: number, @Arg("addUser") addUser: number, @Ctx() ctx: Context): Promise<[Todo, boolean]> {
        const res = await ctx.model.Todo.findCreate(name, desc, expirTime, addUser)
        if (!res[1]) {
            throw new Error('已经存在相同的Todo了')
        }
        return res
    }

}
