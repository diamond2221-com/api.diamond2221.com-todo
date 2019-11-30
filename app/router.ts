import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { accounts, post, common, user, posts } = controller;

    // 公共接口
    // 上传图片
    router.post("/api/common/uploadImage", common.uploadImage);

    // 登录
    // router.post("/api/account/login", account.login);
    router.resources("accountLogin", "/api/account/login", accounts.login);
    // 注册
    // router.post("/api/account/register", account.register);
    router.resources("accountLogin", "/api/account/login", accounts.register);

    // 获取用户的帖子
    // router.get("/api/post/getUserPosts", post.getUserPosts);
    router.resources("userPost", "/api/posts/user", posts.user);

    // 添加帖子评论
    // router.post("/api/post/addComments", post.addComments);
    router.resources("comment", "/api/posts/comment", posts.comment);

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
    // router.get("/api/post/allPosts", post.allPosts)
    router.resources("posts", "/api/posts/post", posts.index);

    // 获取用户粉丝
    router.get("/api/user/focusUserList", user.focusUserList)

    // 获取用户收藏的帖子
    router.resources("markPost", "/api/posts/markPostList", posts.markPost);

    // // 获取推荐用户
    // router.get("/api/getSuggestedUser", login.login)
    // // 获取登录用户关注
    // router.get("/api/getLoginUserFocus", login.login)
    // // 上传用户头像
    // router.post("/api/uplaod_user_pic", login.login)
};
