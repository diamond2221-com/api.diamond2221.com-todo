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
        comment: '帖子id 唯一',
        field: "id"
    })
    id: number;

    @Column({
        type: INTEGER("255"),
        comment: "收藏帖子的Id",
        field: "post_id"
    })
    postId: number;

    @Column({
        type: STRING(255),
        comment: '收藏者Id',
        field: "user_id"
    })
    userId: string;

    @Column({
        type: STRING(13),
        comment: '收藏帖子的时间',
        field: "add_time"
    })
    addTime: string;

    static async fetchUserMarkPostsByUserId(userId: string, size: number, page: number) {
        return await this.findAll({
            where: {
                userId
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async getUserMarkPosst(userId: string, postId: number) {
        return await this.findOne({ where: { postId, userId } })
    }

    static async createUserMarkPost(postId: number, userId: string) {
        return await this.create({ postId, userId, addTime: Date.now() })
    }

    static async delUserMarkPost(postId: number, userId: string) {
        return await this.destroy({ where: { postId, userId } })
    }
};

export default () => MarkPost;
