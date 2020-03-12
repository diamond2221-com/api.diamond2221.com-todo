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
    id: number;

    @Column({
        type: INTEGER("255"),
        comment: '回复的id 回复的是帖子 为0',
        field: "r_id"
    })
    rId: number;

    @Column({
        type: INTEGER("255"),
        comment: '回复的上级id 回复的是帖子 为0',
        field: "p_id"
    })
    pId: number;

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

    static async fetchPostComments(postId: number, rId: number, size: number, page: number) {
        return await this.findAndCountAll({
            raw: true,
            where: {
                postId,
                rId
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async createComment(postId: number, userId: string, content: string, rId: number, _pId: number) {
        return await this.create({
            postId,
            userId,
            content,
            rId,
            pId: 0,
            addTime: Date.now()
        })
    }

    static async getPostCommentSize(postId: number) {
        return await this.count({
            where: {
                postId
            }
        })
    }
};

export default () => {
    return Comment
}
