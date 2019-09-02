import EggMysql from 'egg-mysql';

interface userStructure {
  userId: string
}

declare module 'egg' {
  interface Application {
    mysql: EggMysql
  }

  interface Context {
    // 在app/extend/context.js中定义的返回客户端的方法
    send(data: any, status: number, message?: string): function,
    user: userStructure
  }
}
