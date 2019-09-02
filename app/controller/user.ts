import { Controller } from "egg";
import { UserInfo } from "../types/account_interface"

export interface AllUserInfo extends UserInfo {
    postNum: number;
    fansNum: number;
    focusNum: number;
}

export default class UserController extends Controller {
    /**
     * getUserInfo
     */
    public async getUserInfo() {
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
        result.fansNum = await service.post.getUserFansCountByUserId(userId);
        result.focusNum = await service.post.getUserFocusCountByfocusUserId(userId);


        ctx.send(result, 200, "")
    }
    /**
     * @description 修改账户信息
     * @author ZhangYu
     * @date 2019-08-30
     * @memberof UserController
     */
    public async changeAccount() {
        const { ctx, service } = this;
        const { userName, img, name, signature, userId, website } = ctx.body;
        let newUserInfo = {};
        function addProp(obj, key: string, prop: any) {
            if (prop && prop !== 0) {
                obj[key] = prop;
            }
        }

        addProp(newUserInfo, "userName", userName);
        addProp(newUserInfo, "img", img);
        addProp(newUserInfo, "name", name);
        addProp(newUserInfo, "signature", signature);
        addProp(newUserInfo, "website", website);

        await service.user.changeUserInfoByUserId(userId, newUserInfo);
        ctx.send(200, "修改成功", {});
    }

    /**
     * @description 用户收藏帖子
     * @author ZhangYu
     * @date 2019-09-02
     * @memberof UserController
     */
    public async markPost() {
    //     const { ctx, service } = this;
    //     const {postId, userId} = ctx;
    //     service
    }
}
