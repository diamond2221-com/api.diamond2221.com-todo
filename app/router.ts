import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { account, post, common, user } = controller;

    // 公共接口
    // 上传图片
    router.post("/api/common/uploadImage", common.uploadImage)


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

    // 修改用户个人信息
    router.post("/api/user/changeAccount", user.changeAccount);

    // 收藏帖子
    router.post("/api/user/markPost", user.markPost)

    // // 获取状态
    // router.get("/api/getStatus", login.login)
    // // 获取推荐用户
    // router.get("/api/getSuggestedUser", login.login)
    // // 获取登录用户信息
    // router.get("/api/getLoginUserInfo", login.login)
    // // 获取登录用户帖子
    // router.get("/api/getLoginUserPosts", login.login)
    // // 获取其他用户信息
    // router.get("/api/getOtherUserInfo", login.login)
    // // 获取其他用户帖子
    // router.get("/api/getOtherUserPosts", login.login)
    // // 获取登录关注帖子
    // router.get("/api/getLoginMarkPost", login.login)
    // // 获取所有帖子
    // router.get("/api/getAllPostInfo", login.login)
    // // 获取登录用户粉丝
    // router.get("/api/getLoginUserFans", login.login)
    // // 获取登录用户关注
    // router.get("/api/getLoginUserFocus", login.login)
    // // 获取首页数据
    // router.post("/api/getIndexInfo", login.login)
    // // 上传用户头像
    // router.post("/api/uplaod_user_pic", login.login)
    // // 上传帖子图片
    // router.post("/api/postsUploadImage", login.login)
    // // 帖子添加评论·
    // router.post("/api/addComment", login.login)
    // // 收藏帖子
    // router.post("/api/markPost", login.login)
    // // 关注用户
    // router.post("/api/focusUser", login.login)
    // // 取消关注用户
    // router.post("/api/cancelFocusUser", login.login)
};
