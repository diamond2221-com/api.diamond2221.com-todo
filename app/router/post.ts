import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { PrefixV1Url } = app.config;
    const { posts } = controller;

    // 用户帖子相关
    router.resources("userPostList", `${PrefixV1Url}/posts/list`, posts.list);

    // 用户发帖
    router.resources("newPost", `${PrefixV1Url}/posts/add`, posts.add);

    // 帖子评论相关
    router.resources("comment", `${PrefixV1Url}/posts/comment`, posts.comment);

    // 首页我的和关注的人的帖子
    router.resources("posts", `${PrefixV1Url}/posts/index`, posts.index);

    // 所有帖子相关
    router.resources("posts", `${PrefixV1Url}/posts/all`, posts.all);

    // 获取单个帖子详情
    router.resources("postDetail", `${PrefixV1Url}/posts/detail`, posts.detail);

    // 用户收藏帖子相关
    router.resources("markPost", `${PrefixV1Url}/posts/markPost`, posts.markPost);

    // 用户喜欢帖子相关
    router.resources("likePost", `${PrefixV1Url}/posts/likePost`, posts.likePost);

}
