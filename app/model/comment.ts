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
        comment: '用户评论的ID',
        field: "comment_id"
    })
    commentId: number;

    @Column({
        type: INTEGER("255"),
        comment: "评论所属帖子的帖子Id",
        field: "post_id"
    })
    postId: number;

    @Column({
        type: STRING("255"),
        comment: "评论的所属者ID",
        field: "user_id"
    })
    userId: string;

    @Column({
        type: STRING(300),
        comment: '用户评论的内容',
        field: "content"
    })
    content: string;

    @Column({
        type: STRING(13),
        comment: '用户评论的评论时间',
        field: "add_time"
    })
    addTime: string;

    static async fetchPostComments(postId: number, size: number, page: number) {
        return await this.findAll({
            where: {
                postId
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async createComment(postId: number, userId: string, content: string) {
        return await this.create({
            postId,
            userId,
            content,
            addTime: Date.now()
        })
    }
};

export default () => {
    return Comment
}
