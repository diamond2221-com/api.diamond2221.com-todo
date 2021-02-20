/**
 * @desc 用户表
 */
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_todo'
})
export class Todo extends Model<Todo> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER,
        comment: '主键id',
        field: 'id'
    })
    public id: number;

    @Column({
        type: INTEGER,
        field: 'add_user'
    })
    public addUser: number;

    @Column({
        type: STRING(255),
        comment: "name",
        field: 'name'
    })
    public name: string;

    @Column({
        type: STRING(255),
        field: 'desc'
    })
    public desc: string;

    @Column({
        type: STRING(13),
        field: 'add_time'
    })
    public addTime: string;

    @Column({
        type: STRING(13),
        field: 'expir_time'
    })
    public expirTime: string;

    @Column({
        type: STRING(13),
        field: 'up_time'
    })
    public upTime: string;

    @Column({
        type: STRING(1),
        field: 'status'
    })
    public status: 1 | 2 | 3;

    public static async fetchAllAndCount(page: number, size: number, orderType: 1 | 2 | 3): Promise<any> {
        let p = new Promise(resolve => {
            enum EOrderType {
                'expir_time',
                'add_time',
                'up_time'
            }
            resolve((this.findAndCountAll<Todo>({
                where: {
                    status: 1
                },
                limit: size,
                offset: (page - 1) * size,
                order: [EOrderType[orderType - 1], 'desc']
            })))
        })
        return await p
    }

    public static async findCreate(name: string, desc: string, expirTime: number, addUser: number) {
        const data = {
            name,
            desc,
            addUser,
            expirTime
        }
        const defaults = {
            ...data,
            addTime: Date.now(),
            upTime: Date.now()
        }
        return this.findOrCreate<Todo>({
            where: data,
            defaults
        })
    }

    public static async findTodo(id: number) {
        return this.findOne({
            where: {
                id
            }
        })
    }

    public static async updateTodo(id: number, name: string, desc: string, expirTime: number) {
        const data = {
            name,
            desc,
            expirTime,
            upTime: Date.now()
        }
        return this.update<Todo>(data, {
            where: {
                id
            }
        })
    }

    public static async updateDelete(id: number) {
        return this.update(
            {
                status: 2
            },
            {
                where: {
                    id
                }
            })
    }
};

export default () => {
    return Todo;
}
