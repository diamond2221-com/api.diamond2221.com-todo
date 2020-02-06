import { Controller } from "egg";

export default class ChangePasswordController extends Controller {
    /**
     * @description 修改用户密码
     * @author ZhangYu
     * @date 2020-02-06
     * @returns
     * @memberof PasswordController
     */
    public async create() {
        const { ctx, service } = this;
        const { accounts } = service;
        // 定义创建接口的请求参数规则
        const rules = { cppOldPassword: "string", cppNewPassword: 'string', cppConfirmPassword: 'string' };
        try { ctx.validate(rules, ctx.request.body); } catch (error) { return ctx.send('参数错误', 400); }

        const { cppOldPassword, cppNewPassword, cppConfirmPassword } = ctx.request.body;
        const userId: string = ctx.request.header["client-uid"];
        if (cppNewPassword !== cppConfirmPassword) {
            return ctx.send("两次密码不一致", 200)
        }

        if (await accounts.verifyUserPassword(userId, cppOldPassword)) {
            await accounts.changepass_word(userId, cppConfirmPassword)
            ctx.send("密码修改成功", 200);
        } else {
            ctx.send("旧密码验证错误", 200)
        }
    }
}
