import { Controller } from "egg";

// import { UserInfo, AllUserInfo } from "../../types/account_interface"
import { IOtherUser, IOwnUser } from "../../types/user_interface";
import { CheckParams } from '../../utils/decorators';

export default class InfoController extends Controller {
    /**
     * index
     */
    @CheckParams({ username: "string?", userId: "string?" }, "query")
    public async index() {
        const { ctx, service } = this;
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
                return ctx.send('没有该用户', 400)
            }
        }
    }
}
