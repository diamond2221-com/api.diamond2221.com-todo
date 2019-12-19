/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_mark_post'
})
export class MarkPost extends Model<MarkPost> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER("255"),
        comment: '帖子id 唯一'
    })
    id: number;

    @Column({
        type: INTEGER("255"),
        comment: "收藏帖子的Id"
    })
    post_id: number;

    @Column({
        type: STRING(255),
        comment: '收藏者Id'
    })
    user_id: string;

    @Column({
        type: STRING(13),
        comment: '收藏帖子的时间'
    })
    add_time: string;
};
export default () => {
    return MarkPost;
};

