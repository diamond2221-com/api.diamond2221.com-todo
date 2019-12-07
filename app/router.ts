import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { accounts, commons, users, posts } = controller;

    // 公共接口
    // 上传图片
    router.resources("uploadImages", "/api/commons/uploadImages", commons.uploadImages);


    // 登录
    router.resources("accountLogin", "/api/accounts/login", accounts.login);

    // 注册
    router.resources("accountLogin", "/api/accounts/register", accounts.register);


    // 用户帖子相关
    router.resources("userPost", "/api/posts/user", posts.user);

    // 帖子评论相关
    router.resources("comment", "/api/posts/comment", posts.comment);

    // 所有帖子相关
    router.resources("posts", "/api/posts/post", posts.index);

    // 用户收藏帖子相关
    router.resources("markPost", "/api/posts/markPost", posts.markPost);

    // 用户信息相关
    router.resources("users", "/api/users/info", users.info);

    // 用户个人信息操作相关
    router.resources("updateUser", "/api/users/update", users.update);

    // 关注用户
    router.resources("focusUser", "/api/users/focus", users.focus);

    // 用户粉丝相关
    router.resources("fansUser", "/api/users/fans", users.fans);

    // 搜索用户
    router.resources("searchUser", "/api/users/search", users.search);
    // // 获取推荐用户
    // router.get("/api/getSuggestedUser", login.login)
    // // 获取登录用户关注
    // router.get("/api/getLoginUserFocus", login.login)
};
