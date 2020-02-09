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
}

