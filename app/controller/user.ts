import { Controller } from "egg";
import { CheckParams } from '../utils/decorators';

export default class UserController extends Controller {
    /**
     * index
     * 列表
     */
    @CheckParams({ page: 'number', size: 'number'}, "query")
    public async index() {
        const { ctx } = this;
        // const { page, size, orderType } = ctx.query
        // const res = await ctx.model.Usermodel.fetchAllAndCount(page, size, orderType)

        console.log(ctx.model.Todomodel, ctx.model.User)
        // ctx.send('res')

        const res = (await ctx.model.Todomodel.findAndCountAll(
            {
                // where: {
                //     addUser: 2
                // },
                include: [{
                    model: ctx.model.Usermodel,
                    as: 'user',
                    // attributes: ['name', 'phone', 'upd_time']
                }],
            }
        ))
        // const data = res.rows[0].toJSON()
        // console.log(data)
        ctx.send(res)
    }

    /**
     * show
     * 详情
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
}
