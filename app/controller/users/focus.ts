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
        const { page, size } = ctx.request.body;
        const userId = ctx.request.header["Client-Uid"];
        let focusList = service.user.getFocusListByUserId(userId, Number(page), Number(size));
        ctx.send(focusList, 200)
    }

    /**
     * @description 用户关注用户
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof FocusController
     */
    public async create() {
        const { ctx, service } = this;
        const id = ctx.request.body.userId;
        const userId = ctx.request.header["Client-Uid"];
        await service.user.focusUserByUserId(userId, id);
        ctx.send({}, 200, "关注成功");
    }

    /**
     * @description 取消关注用户
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof FocusController
     */
    public async destroy() {
        const { ctx, service } = this;
        const { focusUserId } = ctx.request.body;
        const userId = ctx.request.header["Client-Uid"];
        await service.user.cancelFocusUserByUserId(userId, focusUserId);
        ctx.send({}, 200, "取消关注成功")
    }
}
