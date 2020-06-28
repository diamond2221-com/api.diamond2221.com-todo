import { Controller } from "egg";
import { CheckParams } from '../../utils/decorators';

export default class UpdateController extends Controller {
    /**
     * @description 修改账户信息
     * @author ZhangYu
     * @date 2019-08-30
     * @memberof UserController
     */
    @CheckParams({ userName: "string?", img: "string?", name: "string?", signature: "string?", website: "string?" }, "request.body")
    public async create() {
        const { ctx, service } = this;
        const { userName = "", img, name, signature, website } = ctx.request.body;
        const userId = ctx.request.header["client-uid"];
        if (userName.trim()) {
            // return ctx.send("请填写账号", 200)
            const repeatUserNameUser: boolean = await service.user.verifyRepeatUserName(userId, userName);
            if (repeatUserNameUser) {
                return ctx.send("这个帐号用不了，换一个试试呗。", 200);
            }
        }
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
}
