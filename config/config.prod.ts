import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '981220zy',  /* 家用 */
      // password: '981220Zy+++', /* 公司 */
      // 数据库名
      database: 'db_instagram',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'db_instagram',
    username: "root",
    password: "981220zy"
  }

  // 不需要验证token的 路由白名单
  config.authWhiteList = [
    "/api/commons/uploadImages",
    "/api/accounts/login",
    "/api/accounts/register"
  ]

  return config;
};
