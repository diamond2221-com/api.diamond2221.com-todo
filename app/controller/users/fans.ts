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
        let fansList = await service.user.getFansListByUserId(userId, page, size);
        ctx.send(fansList)
    }

}
