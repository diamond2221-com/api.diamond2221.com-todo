import { Controller } from "egg";

// import { UserInfo, AllUserInfo } from "../../types/account_interface"
import { IOtherUser, IOwnUser } from "../../types/user_interface";

export default class InfoController extends Controller {
    /**
     * index
     */
    public async index() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            username: "string?",
            userId: "string?"
        };
        try {
            ctx.validate(rules, ctx.query);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        let username: string = ctx.query.username || '';
        let userId: string = ctx.query.userId || '';
        const myUserId: string = ctx.getUid()
        let result: IOtherUser | IOwnUser | null = await service.user.getUserDetailInfo(userId, 'user_id', myUserId)
        if (result) {
            ctx.send(result)
        } else {
            result = await service.user.getUserDetailInfo(username, 'user_name', myUserId)
            if (result) {
                ctx.send(result)
            } else {
                return ctx.send('没有该用户', 200)
            }
        }
    }
}
