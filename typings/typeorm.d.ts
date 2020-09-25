import 'egg'
import { Repository, Connection } from 'typeorm'
import BaseInfo from '../app/entity/BaseInfo'

declare module 'egg' {
  interface Context {
    connection: Connection
    entity: {
      BaseInfo: any
    }
    repo: {
      BaseInfo: Repository<BaseInfo>
    }
  }
}
