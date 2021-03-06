import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security

    config.cluster = {
        listen: {
            port: 7002,
        }
    };

    // 关闭安全威胁csrf的防范
    config.security = {
        csrf: {
            enable: false
        },
        xframe: {
            enable: false
        }
    };

    config.cors = {
        origin: "*",
        allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
    };

    // token 在请求头中的 名称
    config.auth_headers_name = "client-token";
    config.jwtSecret = "store";

    config.keys = appInfo.name + "_1563628739386_852";
    "";

    // add your egg config in here
    // 使用koa的中间件
    config.middleware = ["authorization", "singleSign" /* "grpaql" */];

    config.multipart = { mode: "file" };


    config.APPPATH = "/TODO";
    config.graphql = {
        router: `${config.APPPATH}/graphql/query`
    };

    config.bodyParser = {
        enable: true,
        jsonLimit: "10mb",
        formLimit: "10mb"
    };

    config.validate = {
        convert: true
    };

    config.postImgConf = "";
    // "?x-oss-process=image/auto-orient,1/interlace,1/quality,q_20/format,jpg/watermark,text_ZGlhbW9uZDIyMjEuY29t,color_ffffff,size_10,shadow_100,x_1,y_1";

    // add your special config in here
    const bizConfig = {
        // sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
    };

    config.static = {
        prefix: '/'
    }

    // the return config will combines to EggAppConfig
    return {
        ...config,
        ...bizConfig
    };
};
