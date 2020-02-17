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

    // token 在请求头中的 名称
    config.auth_headers_name = 'Client-Token';
    config.jwtSecret = "ins_zhangyu"

    config.keys = appInfo.name + '_1563628739386_852';
''
    // add your egg config in here
    // 使用koa的中间件
    // config.middleware = [];
    config.middleware = [ "authorization", "singleSign" ];

    config.multipart = {
        mode: "file"
    }
    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'db_instagram',
        username: "root",
        password: "981220zy",
        define: {
            underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
            // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
            // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
            freezeTableName: true,
            timestamps: false
        },
        query: {
            raw: true
        }
    }

    config.bodyParser = {
        enable: true,
        jsonLimit: '5mb',
        formLimit: '10mb',
    }
    config.validate = {
        convert: true,
    }

    config.postImgConf = "?x-oss-process=image/auto-orient,1/interlace,1/quality,q_80/watermark,text_ZGlhbW9uZDIyMjEuY24,color_ffffff,size_10,shadow_100,x_1,y_1";
    // config.sequelize = {
    //     dialect: 'mysql',
    //     host: '127.0.0.1',
    //     port: 3306,
    //     database: 'egg-sequelize-doc-default',
    // }

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
