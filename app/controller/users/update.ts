import { Controller } from "egg";

export default class UpdateController extends Controller {
    /**
     * @description 修改账户信息
     * @author ZhangYu
     * @date 2019-08-30
     * @memberof UserController
     */
    public async create() {
        const { ctx, service } = this;

        // 定义创建接口的请求参数规则
        const rules = {
            userName: "string?",
            img: "string?",
            name: "string?",
            signature: "string?",
            website: "string?"
        };
        try {
            ctx.validate(rules, ctx.request.body);
        } catch (error) {
            return ctx.send('参数错误', 400);
        }

        const { userName = "", img, name, signature, website } = ctx.request.body;
        const userId = ctx.request.header["client-uid"];
        if (userName.trim()) {
            // return ctx.send("请填写账号", 200)
            const repeatUserNameUser: boolean = await service.accounts.verifyRepeatUserName(userId, userName);
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

        addProp(newUserInfo, "user_name", userName);
        addProp(newUserInfo, "img", img);
        addProp(newUserInfo, "name", name);
        addProp(newUserInfo, "signature", signature);
        addProp(newUserInfo, "website", website);

        const result = await service.user.changeUserInfoByUserId(userId, newUserInfo);
        ctx.send(result, 200, "修改成功");
    }
}
