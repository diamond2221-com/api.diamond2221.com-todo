/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, Table, AutoIncrement } from 'sequelize-typescript';
// import * as Sequelize from "sequelize"

const { STRING, INTEGER } = DataType;
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
};


export default () => {
    return User;
}
