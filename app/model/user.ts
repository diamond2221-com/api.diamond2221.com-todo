/**
 * @desc 用户表
 */
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
// import * as Sequelize from "sequelize"
// import { Application } from 'egg'

const { STRING, INTEGER, DATE } = DataType;

@Table({
    modelName: 'tbl_user'
})
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER,
        comment: '主键id',
        field: 'id'
    })
    public id: number;

    @Column({
        type: STRING(255),
        comment: "name",
        field: 'name'
    })
    public name: string;

    @Column({
        type: STRING(11),
        field: 'phone'
    })
    public phone: string;

    @Column({
        type: STRING(13),
        field: 'add_time'
    })
    public add_time: string;

    @Column({
        type: STRING(13),
        field: 'up_time'
    })
    public up_time: string;

    @Column({
        type: DATE('string'),
        field: 'upd_time'
    })
    public upd_time: Date;

    public static async getUser(id: number) {
        return await this.findOne({
            where: {
                id
            }
        })
    }
    // static associate() {
    //     User.hasMany(Todo, { foreignKey: 'addUser' });
    // }
};


export default () => {
    // export default (app: Application) => {

    return User;
}
