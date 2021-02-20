import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  cors: {
    enable: true,
    package: "egg-cors"
  },
  validate: {
    enable: true,
    package: "egg-validate"
  },
  sequelize: {
    enable: true,
    package: "egg-sequelize-ts"
  },
  // sequelize: {
  //   enable: true,
  //   package: 'egg-sequelize',
  // },
  // redis: {
  //   enable: true,
  //   package: "egg-redis"
  // }
};

export default plugin;
