import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security

    // 关闭安全威胁csrf的防范
    // config.security = {
    //   csrf: {
    //     ignore: ctx => {
    //       let ipReg = /^(172\.17|127\.0)/;
    //       return ipReg.test(ctx.ip)
    //     }
    //   }
    // }

    config.security = {
        csrf: {
            enable: false,
            // ignoreJSON: true
        },
        domainWhiteList: [
            'http://localhost:7001',
            'http://127.0.0.1:7001',
            "http://instagram.api.cn",
            "http://instagram.api.com"
        ]
    }

    config.cors = {
        origin: "*",
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    // 不需要验证token的 路由白名单
    config.authWhiteList = [
        "/api/commons/uploadImages",
        "/api/accounts/login",
        "/api/accounts/register",
        // "/api/users/search"
    ]

    // token 在请求头中的 名称
    config.auth_headers_name = 'Client-Token';
    config.jwtSecret = "ins_zhangyu"

    config.keys = appInfo.name + '_1563628739386_852';
''
    // add your egg config in here
    // 使用koa的中间件
    // config.middleware = [];
    config.middleware = [ "authorization" ];

    config.multipart = {
        mode: "file"
    }

    config.bodyParser = {
        enable: true,
        jsonLimit: '5mb',
        formLimit: '10mb',
    }
    config.validate = {
        convert: true,

    }
    // add your special config in here
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    };


    // the return config will combines to EggAppConfig
    return {
        ...config,
        ...bizConfig,
    };
};
