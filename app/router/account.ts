import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { accounts } = controller;

    // 登录
    router.resources("accountLogin", "/api/v1/accounts/login", accounts.login);

    // 注册
    router.resources("accountRegister", "/api/v1/accounts/register", accounts.register);

    // 修改密码
    router.resources("changePassword", "/api/v1/accounts/changePassword", accounts.changePassword);

    // 发送注册验证码
    router.resources("sendSms", "/api/v1/accounts/signUp/sms", accounts.signUp.sms);

    // 验证注册信息
    router.resources("verifySignUp", "/api/v1/accounts/signUp/verify", accounts.signUp.verify)
}

