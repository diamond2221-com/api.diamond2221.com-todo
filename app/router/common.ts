import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { PrefixV1Url } = app.config;
    const { commons } = controller;

    // 公共接口
    // 上传图片
    router.resources("uploadImages", `${PrefixV1Url}/commons/uploadImages`, commons.uploadImages);
}

