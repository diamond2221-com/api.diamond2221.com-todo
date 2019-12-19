/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_focus'
})
export class Comment extends Model<Comment> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER("255"),
        comment: '用户评论的ID'
    })
    comment_id: number;

    @Column({
        type: INTEGER("255"),
        comment: "评论所属帖子的帖子Id"
    })
    post_id: number;

    @Column({
        type: STRING("255"),
        comment: "评论的所属者ID"
    })
    user_id: string;

    @Column({
        type: STRING(300),
        comment: '用户评论的内容'
    })
    content: string;

    @Column({
        type: STRING(13),
        comment: '用户评论的评论时间'
    })
    add_time: string;
};
export default () => {
    return Comment;
};

