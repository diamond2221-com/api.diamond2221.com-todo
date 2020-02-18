import EggMysql from 'egg-mysql';
import * as sequelize from "sequelize";
import { Sequelize, ISequelizeValidationOnlyConfig } from 'sequelize-typescript';

interface userStructure {
  userId: string
}

declare module 'egg' {
  interface Application {
    mysql: EggMysql;
    Sequelize: Sequelize;
    model: IModel;
  }

  interface Context {
    // 在app/extend/context.js中定义的返回客户端的方法
    send(data?: any, status?: number, message?: string): function,
    sendSms(data: { phoneNumbers: string, SignName: string, TemplateCode: string, Code: string }): Promise
    user: userStructure
  }
}
