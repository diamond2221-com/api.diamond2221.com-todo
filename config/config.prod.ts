import { EggAppConfig, PowerPartial } from "egg";

export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: "127.0.0.1",
            // 端口号
            port: "3306",
            // 用户名
            user: "root",
            // 密码
            password: "981220Zy+++",
            // 数据库名
            database: "db_instagram"
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false
    };

    config.sequelize = {
        dialect: "mysql",
        host: "127.0.0.1",
        port: 3306,
        database: "db_instagram",
        username: "root",
        password: "981220Zy+++",
        define: {
            underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
            // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
            // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
            freezeTableName: true,
            timestamps: false
        },
        query: {
            // raw: true
        }
    };

    config.security = {
        domainWhiteList: [
            "http://api.diamond2221.com",
            "https://api.diamond2221.com",
            "https://www.diamond2221.com",
            "https://m.diamond2221.com"
        ]
    };

    config.cors = {
        origin: '*', // 可以填入 '*'，如果你不使用cookie的话。
        credentials: true, // 允许cookie跨域
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    // redis本地配置
    config.redis = {
        client: {
            port: 6379, // Redis port
            host: "127.0.0.1", // Redis host
            password: "981220Zy+++",
            db: 0
        }
    };

    // 不需要验证token的 路由白名单
    config.authWhiteList = [
        `${config.APPPATH}/commons/uploadImages`,
        `${config.APPPATH}/accounts/login`,
        `${config.APPPATH}/accounts/register`,
        `${config.APPPATH}/users/search`,
        `${config.APPPATH}/accounts/signUp/sms`,
        `${config.APPPATH}/accounts/signUp/verify`,
    ];

    return config;
};
