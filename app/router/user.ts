import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { users } = controller;

    // 用户信息相关
    router.resources("users", "/api/v1/users/info", users.info);

    // 用户个人信息操作相关 修改
    router.resources("updateUser", "/api/v1/users/update", users.update);

    // 用户个人手机号信息 验证
    router.resources("phoneNumberVerify", "/api/v1/users/phone/verify", users.phone.verify);

    // 用户个人手机号信息 验证码
    router.resources("phoneNumberSendSms", "/api/v1/users/phone/sms", users.phone.sms);

    // 用户个人手机号信息 验证码
    router.resources("phoneNumberSendSms", "/api/v1/users/phone/update", users.phone.update);

    // 关注用户
    router.resources("focusUser", "/api/v1/users/focus", users.focus);

    // 用户粉丝相关
    router.resources("fansUser", "/api/v1/users/fans", users.fans);

    // 搜索用户
    router.resources("searchUser", "/api/v1/users/search", users.search);

    // // 获取推荐用户
    // router.get("/api/v1/getSuggestedUser", login.login)
    // // 获取登录用户关注
    // router.get("/api/v1/getLoginUserFocus", login.login)
}
