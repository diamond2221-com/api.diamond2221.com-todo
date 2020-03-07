/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_like_post'
})
export class LikePost extends Model<LikePost> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER("255"),
        comment: '喜欢的ID',
        field: "id"
    })
    id: number;

    @Column({
        type: INTEGER("255"),
        comment: "点赞的帖子ID",
        field: "post_id"
    })
    postId: number;

    @Column({
        type: STRING(255),
        comment: '点赞的用户ID',
        field: "user_id"
    })
    userId: string;

    @Column({
        type: STRING(13),
        comment: '点赞的时间',
        field: "add_time"
    })
    addTime: string;

    static async countLikePost(postId: number) {
        return await this.count({
            where: {
                postId
            }
        })
    }

    static async getUserLikePost(userId: string, postId: number) {
        return await this.count({ where: { userId, postId } })
    }

    static async createUserLikePost(postId: number, userId: string) {
        return await this.create({ postId, userId, addTime: Date.now() })
    }

    static async delUserLikePost(postId: number, userId: string) {
        return await this.destroy({ where: { postId, userId, } })
    }
};

export default () => LikePost

