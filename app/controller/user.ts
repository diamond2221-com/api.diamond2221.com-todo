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
        result.fansNum = await service.user.getUserFansCountByUserId(userId);
        result.focusNum = await service.user.getUserFocusCountByfocusUserId(userId);

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
        const { userName, img, name, signature, userId, website } = ctx.request.body;
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

        const result = await service.user.changeUserInfoByUserId(userId, newUserInfo);
        ctx.send(result, 200, "修改成功");
    }

    /**
     * @description 用户收藏帖子
     * @author ZhangYu
     * @date 2019-09-02
     * @memberof UserController
     */
    public async markPost() {
        const { ctx, service } = this;
        const { postId } = ctx.request.body;
        const userId = ctx.request.header["client-uuid"];
        const isMark: boolean = await service.user.findMarkPost(Number(postId), userId);

        if (isMark) {
            ctx.send("已收藏该帖子", 400);
        } else {
            const isSelfPost: boolean = await service.user.isSelfPost(Number(postId), userId);
            if (isSelfPost) {
                ctx.send("不可以收藏自己的帖子", 400);
            } else {
                await service.user.markPostByPostId(Number(postId), userId);
                ctx.send({}, 200, "收藏成功");

            }
        }
    }

    /**
     * @description 用户关注用户
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof UserController
     */
    public async focusUser() {
        const { ctx, service } = this;
        const { id } = ctx.request.body;
        const userId = ctx.request.header["client-uuid"];
        await service.user.focusUserByUserId(userId, id);
        ctx.send({}, 200, "关注成功");
    }

    /**
     * @description 取消关注用户
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof UserController
     */
    public async cancelFocusUser() {
        const { ctx, service } = this;
        const { focusUserId } = ctx.request.body;
        const userId = ctx.request.header["client-uuid"];
        await service.user.cancelFocusUserByUserId(userId, focusUserId);
        ctx.send({}, 200, "取消关注成功")
    }

    /**
     * @description 获取用户关注用户列表
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof UserController
     */
    public async focusUserList() {
        const { ctx, service } = this;
        const { page, size } = ctx.request.body;
        const userId = ctx.request.header["client-uuid"];
        let focusList = service.user.getFocusListByUserId(userId, Number(page), Number(size));
        ctx.send(focusList, 200)
    }

    /**
     * @description 获取用户 粉丝用户列表
     * @author ZhangYu
     * @date 2019-09-03
     * @memberof UserController
     */
    public async fansUserList() {
        const { ctx, service } = this;
        const { page, size } = ctx.request.body;
        const userId = ctx.request.header["client-uuid"];
        let focusList = service.user.getFocusListByUserId(userId, Number(page), Number(size));
        ctx.send(focusList, 200)
    }

}
