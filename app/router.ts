import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { account, post } = controller;


    // 登录
    router.post("/api/account/login", account.login)
    // 注册
    router.post("/api/account/register", account.register)

    router.get("/api/post/getUserPosts", post.getUserPosts)

    // // 发送帖子
    // router.post("/postMessage", login.login)
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
