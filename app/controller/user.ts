import { Controller } from "egg";

export default class UserController extends Controller {
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
        const { ctx, service } = this;
        const {postId, userId} = ctx;
        service
    }
}
