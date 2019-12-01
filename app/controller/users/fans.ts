import { Controller } from "egg";

export default class FansController extends Controller {

    /**
     * @description 获取用户 粉丝用户列表
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof FansController
     */
    public async index() {
        const { ctx, service } = this;
        const { page, size } = ctx.request.body;
        const userId = ctx.request.header["Client-Uid"];
        let fansList = await service.user.getFansListByUserId(userId, Number(page), Number(size));
        ctx.send(fansList, 200, "成功")
    }

}
