import { Controller } from "egg";
import { CheckParams } from '../utils/decorators';

export default class TodoController extends Controller {
    /**
     * index
     */
    @CheckParams({ page: 'number', size: 'number', orderType: { type: 'int', min: 1, max: 3 } }, "query")
    public async index() {
        const { ctx } = this;
        const { page, size, orderType } = ctx.query
        const res = await ctx.model.Todo.fetchAllAndCount(page, size, orderType)
        ctx.send(res)
    }

    /**
     * create
     */
    @CheckParams({
        name: 'string',
        desc: 'string',
        expirTime: 'number',
        addUser: 'number'
    }, "request.body")
    public async create() {
        const { ctx } = this;
        const { name, desc, expirTime, addUser } = ctx.request.body
        const res = await ctx.model.Todo.findCreate(name, desc, expirTime, addUser)
        if (!res[1]) {
            return ctx.send(res[0], 400, '已经存在相同的Todo了')
        }
        ctx.send(res[0])
    }

    /**
     * show
     */
    @CheckParams({
        id: 'number',
    }, "params")
    public async show() {
        const { ctx } = this;
        const { id } = ctx.params
        const res = await ctx.model.Todo.findTodo(id)
        if (res) {
            ctx.send(res)
        } else {
            ctx.send(null, 400, '这条Todo 丢失了')
        }
    }

    /**
     * update
     */
    @CheckParams(
        [
            {
                id: 'number',
            },
            {
                name: 'string',
                desc: 'string',
                expirTime: 'number'
            }
        ],
        [
            "params",
            "request.body"
        ]
    )
    public async update() {
        const { ctx } = this;
        const { id } = ctx.params
        const { name, desc, expirTime } = ctx.request.body
        const res = await ctx.model.Todo.updateTodo(id, name, desc, expirTime)
        if (res[0] === 1) {
            console.log(res[1])
            ctx.send(null)
        } else {
            ctx.send(null, 400, '没有这条Todo')
        }
    }

    /**
     * destroy
     */
    @CheckParams({
        id: 'number',
    }, "params")
    public async destroy() {
        const { ctx } = this;
        const { id } = ctx.params
        const res = await ctx.model.Todo.updateDelete(id)
        ctx.send(res)
    }
}
