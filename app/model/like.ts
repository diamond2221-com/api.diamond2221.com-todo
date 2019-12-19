/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_like'
})
export class Like extends Model<Like> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER("255"),
        comment: '喜欢的ID'
    })
    id: number;

    @Column({
        type: INTEGER("255"),
        comment: "点赞的帖子ID"
    })
    post_id: number;

    @Column({
        type: STRING(255),
        comment: '点赞的用户ID'
    })
    user_id: string;

    @Column({
        type: STRING(13),
        comment: '点赞的时间'
    })
    add_time: string;
};
export default () => {
    return Like;
};

