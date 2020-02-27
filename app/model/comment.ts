/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_comment'
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

    static async fetchPostComments(post_id: number, size: number, page: number) {
        return await this.findAll({
            where: {
                post_id
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async createComment(post_id: number, user_id: string, content: string) {
        return await this.create({
            post_id,
            user_id,
            content,
            add_time: Date.now()
        })
    }
};
export default () => {
    return Comment;
};

