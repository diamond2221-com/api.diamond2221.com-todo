import { Controller } from "egg";

// import { UserInfo, AllUserInfo } from "../../types/account_interface"
import { IUserInfo, IOtherUser, IOwnUser } from "../../types/user_interface";

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
        let userInfo: IUserInfo | null = null;
        if (!username && userId) {
            userInfo = await service.user.getUserInfoByUserId(userId);
        } else if (!userId && username) {
            userInfo = await service.user.getUserInfoByUsername(username);
        }
        if (!userInfo) {
            return ctx.send("没有该用户", 200)
        }
        userId = userInfo.userId;
        const myUserId: string = ctx.getUid()
        if (myUserId !== userInfo.userId) {
            delete userInfo.phoneNumber
        }
        delete userInfo.addTime
        delete userInfo.lastTime
        delete userInfo.password
        let result: IOtherUser | IOwnUser = {
            ...userInfo,
            postNum: 0,
            fansNum: 0,
            focusNum: 0,
            focused: false
        }
        result.postNum = await service.post.getUserPostsCountByUserId(userId);
        result.fansNum = await service.user.getUserFansCountByUserId(userId);
        result.focusNum = await service.user.getUserFocusCountByfocusUserId(userId);
        result.focused = await service.user.floowedByUserId(userId, myUserId)
        ctx.send(result)
    }
}
