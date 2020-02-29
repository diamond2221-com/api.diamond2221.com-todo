import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { PrefixV1Url } = app.config;
    const { users } = controller;

    // 用户信息相关
    router.resources("users", `${PrefixV1Url}/users/info`, users.info);

    // 用户个人信息操作相关 修改
    router.resources("updateUser", `${PrefixV1Url}/users/update`, users.update);

    // 用户个人手机号信息 验证
    router.resources("phoneNumberVerify", `${PrefixV1Url}/users/phone/verify`, users.phone.verify);

    // 用户个人手机号信息 验证码
    router.resources("phoneNumberSendSms", `${PrefixV1Url}/users/phone/sms`, users.phone.sms);

    // 用户个人手机号信息 验证码
    router.resources("phoneNumberSendSms", `${PrefixV1Url}/users/phone/update`, users.phone.update);

    // 关注用户
    router.resources("focusUser", `${PrefixV1Url}/users/focus`, users.focus);

    // 用户粉丝相关
    router.resources("fansUser", `${PrefixV1Url}/users/fans`, users.fans);

    // 搜索用户
    router.resources("searchUser", `${PrefixV1Url}/users/search`, users.search);

    // // 获取推荐用户
    // router.get(`${PrefixV1Url}/getSuggestedUser`, login.login)
    // // 获取登录用户关注
    // router.get(`${PrefixV1Url}/getLoginUserFocus`, login.login)
}
