import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { PrefixV1Url } = app.config;
    const { accounts } = controller;

    // 登录
    router.resources("accountLogin", `${PrefixV1Url}/accounts/login`, accounts.login);

    // 注册
    router.resources("accountRegister", `${PrefixV1Url}/accounts/register`, accounts.register);

    // 修改密码
    router.resources("changePassword", `${PrefixV1Url}/accounts/changePassword`, accounts.changePassword);

    // 发送注册验证码
    router.resources("sendSms", `${PrefixV1Url}/accounts/signUp/sms`, accounts.signUp.sms);

    // 验证注册信息
    router.resources("verifySignUp", `${PrefixV1Url}/accounts/signUp/verify`, accounts.signUp.verify)
}

