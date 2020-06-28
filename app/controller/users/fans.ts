import { Controller } from "egg";
import { CheckParams } from '../../utils/decorators';

export default class FansController extends Controller {

    /**
     * @description 获取用户 粉丝用户列表
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof FansController
     */
    @CheckParams({ page: "number", size: "number" }, "query")
    public async index() {
        const { ctx, service } = this;
        const { page, size } = ctx.query;
        const userId = ctx.request.header["client-uid"];
        let fansList = await service.user.getFansListByUserId(userId, page, size);
        ctx.send(fansList)
    }

}
