import { Controller } from "egg";

export default class FocusController extends Controller {
    /**
     * @description 获取用户关注用户列表
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof UserController
     */
    public async index() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            page: "number",
            size: "number"
        };
        try {
            ctx.validate(rules, ctx.query);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const { page, size } = ctx.query;
        const userId = ctx.request.header["client-uid"];
        let focusList = await service.user.getFocusListByUserId(userId, page, size);
        ctx.send(focusList)
    }

    /**
     * @description 用户关注用户
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof FocusController
     */
    public async create() {
        const { ctx, service } = this;
        const focusUserId = ctx.request.body.userId;
        const userId = ctx.request.header["client-uid"];
        const result: number = await service.user.focusUserByUserId(focusUserId, userId);
        if (result === 0) {
            ctx.send({}, 200, "关注成功");
        } else if(result === 1) {
            ctx.send('已关注该用户', 400);
        } else if (result === 2) {
            ctx.send("关注失败", 400)
        }
    }

    /**
     * @description 取消关注用户
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof FocusController
     */
    public async destroy() {
        const { ctx, service } = this;

        const { userId } = ctx.request.query;
        const focusUserId = ctx.request.header["client-uid"];
        await service.user.cancelFocusUserByUserId(userId, focusUserId);

        ctx.send({}, 200, "取消关注成功")
    }
}
