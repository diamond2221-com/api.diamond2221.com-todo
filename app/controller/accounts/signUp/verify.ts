import { Controller } from "egg";
import { CheckParams } from '../../../utils/decorators';

export default class VerifyController extends Controller {
    @CheckParams({
        userName: "string?",
        phoneNumber: "string?",
        passWord: "string?",
        rePassWord: "string?"
    }, "request.body")
    public async create() {
        const { ctx, service } = this;
        const body = ctx.request.body;

        const userName: string = body.userName;
        const passWord: string = body.passWord;
        const rePassWord: string = body.rePassWord;
        const phoneNumber: number = body.phoneNumber;
        const result: any = {
            userName: "",
            phoneNumber: "",
            passWord: "",
            rePassWord: "",
            status: 0
        };
        const change = () => result.status = 1

        if (userName.trim()) {
            const hasUser: boolean = await service.accounts.verifyRepeatUserName(userName);
            if (hasUser) {
                result.userName = "当前用户名已被使用";
                change()
            }
        } else {
            result.userName = "请输入用户名";
            change()
        }

        if (phoneNumber) {
            const hasPhone: boolean = await service.accounts.verifyRepeatPhoneNumber(phoneNumber);
            if (hasPhone) {
                result.phoneNumber = "当前手机号已被使用";
                change()
            }
        } else {
            result.phoneNumber = "请输入手机号";
            change()
        }

        if (!passWord) {
            result.passWord = "请输入密码";
            change()
        }

        if (!rePassWord) {
            result.rePassword = "请输入确认密码";
            change()
        }

        if (passWord !== rePassWord) {
            result.rePassword = "两次密码不相同";
            change()
        }

        ctx.send(result, 200)
    }
}
