import { Application } from 'egg';


export default (app: Application) => {
    const { controller, router } = app;
    const { commons } = controller;

    // 公共接口
    // 上传图片
    router.resources("uploadImages", "/api/v1/commons/uploadImages", commons.uploadImages);
}

