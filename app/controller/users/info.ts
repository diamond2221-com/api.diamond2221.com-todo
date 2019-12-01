import { Controller } from "egg";

import { UserInfo } from "../../types/account_interface"
export interface AllUserInfo extends UserInfo {
    postNum: number;
    fansNum: number;
    focusNum: number;
}

export default class InfoController extends Controller {
    /**
     * index
     */
    public async index() {
        const { ctx, service } = this;
        const { username } = ctx.query;
        const userInfo: UserInfo | null = await service.user.getUserInfoByUsername(username);
        if (!userInfo) {
            ctx.send("没有该用户", 200)
            return;
        }
        const userId: string = userInfo.userId;
        delete userInfo.password;
        const result: AllUserInfo = {
            ...userInfo,
            postNum: 0,
            fansNum: 0,
            focusNum: 0
        }
        result.postNum = await service.post.getUserPostsCountByUserId(userId);
        result.fansNum = await service.user.getUserFansCountByUserId(userId);
        result.focusNum = await service.user.getUserFocusCountByfocusUserId(userId);

        ctx.send(result, 200, "")
    }


}
