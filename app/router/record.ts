import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { PrefixV1Url } = app.config;
    const { record } = controller;

    // 添加用户访客记录
    router.resources("addVisitRecord", `${PrefixV1Url}/record/visit`, record.visit);
}

