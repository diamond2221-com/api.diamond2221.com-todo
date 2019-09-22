import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { account, post, common, user } = controller;

    // 公共接口
    // 上传图片
    router.post("/api/common/uploadImage", common.uploadImage);

    // 登录
    router.post("/api/account/login", account.login);
    // 注册
    router.post("/api/account/register", account.register);

    // 获取用户的帖子
    router.get("/api/post/getUserPosts", post.getUserPosts);

    // 添加帖子评论
    router.post("/api/post/addComments", post.addComments);

    // 发送帖子
    router.post("/api/post/addPost", post.addPost);

    // 获取用户信息
    router.get("/api/user/getInfo", user.getUserInfo);

    // 修改用户个人信息
    router.post("/api/user/changeAccount", user.changeAccount);

    // 收藏帖子
    router.post("/api/user/markPost", user.markPost);

    // 关注用户
    router.post("/api/user/focusUser", user.focusUser);

    // 取消关注用户
    router.post("/api/user/cancelFocusUser", user.cancelFocusUser);

    // 获取所有帖子
    router.get("/api/post/allPosts", post.allPosts)

    // 获取用户粉丝
    router.get("/api/user/focusUserList", user.focusUserList)

    // 获取用户收藏的帖子
    router.get("/api/post/markPostList", post.getUserMarkPosts)

    // // 获取推荐用户
    // router.get("/api/getSuggestedUser", login.login)
    // // 获取登录用户关注
    // router.get("/api/getLoginUserFocus", login.login)
    // // 上传用户头像
    // router.post("/api/uplaod_user_pic", login.login)
};
