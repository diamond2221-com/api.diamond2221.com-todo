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

    static async fetchUserMarkPostsByUserId(user_id: string, size: number, page: number) {
        return await this.findAll({
            where: {
                user_id
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async getUserMarkPosst(user_id: string, post_id: number) {
        return await this.findOne({ where: { post_id, user_id } })
    }

    static async createUserMarkPost(post_id: number, user_id: string) {
        return await this.create({ post_id, user_id, add_time: Date.now() })
    }

    static async delUserMarkPost(post_id: number, user_id: string) {
        return await this.destroy({ where: { post_id, user_id } })
    }
};
export default () => {
    return MarkPost;
};

