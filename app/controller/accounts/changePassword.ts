import { Controller } from "egg";
import { CheckParams } from '../../utils/decorators';

export default class ChangePasswordController extends Controller {
    /**
     * @description 修改用户密码
     * @author ZhangYu
     * @date 2020-02-06
     * @returns
     * @memberof PasswordController
     */
    @CheckParams({ cppOldPassword: "string", cppNewPassword: 'string', cppConfirmPassword: 'string' }, "request.body")
    public async create() {
        const { ctx, service } = this;
        const { accounts } = service;

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
