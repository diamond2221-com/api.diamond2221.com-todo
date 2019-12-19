/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_focus'
})
export class Focus extends Model<Focus> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER("255"),
        comment: '图片的ID'
    })
    id: number;

    @Column({
        type: STRING("255"),
        comment: "关注用户的主ID"
    })
    user_id: string;

    @Column({
        type: STRING(255),
        comment: '关注用户的副ID'
    })
    focus_user_id: string;

    @Column({
        type: STRING(13),
        comment: '添加的时间戳'
    })
    add_time: string;
};
export default () => {
    return Focus;
};

