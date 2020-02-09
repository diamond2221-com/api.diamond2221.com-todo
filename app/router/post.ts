import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { posts } = controller;

    // 用户帖子相关
    router.resources("userPostList", "/api/v1/posts/list", posts.list);

    // 用户发帖
    router.resources("newPost", "/api/v1/posts/add", posts.add);

    // 帖子评论相关
    router.resources("comment", "/api/v1/posts/comment", posts.comment);

    // 首页我的和关注的人的帖子
    router.resources("posts", "/api/v1/posts/index", posts.index);

    // 所有帖子相关
    router.resources("posts", "/api/v1/posts/all", posts.all);

    // 获取单个帖子详情
    router.resources("postDetail", "/api/v1/posts/detail", posts.detail);

    // 用户收藏帖子相关
    router.resources("markPost", "/api/v1/posts/markPost", posts.markPost);

    // 用户喜欢帖子相关
    router.resources("likePost", "/api/v1/posts/likePost", posts.likePost);

}
