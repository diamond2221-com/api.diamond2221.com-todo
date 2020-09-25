import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;
    const { APPPATH } = app.config;
    const { todo } = controller;

    // 用户信息相关
    router.resources("baseInfo", `${APPPATH}/todo`, todo);
}
