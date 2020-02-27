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

    static async countLikePost(post_id: number) {
        return await this.count({
            where: {
                post_id
            }
        })
    }

    static async getUserLikePost(user_id: string, post_id: number) {
        return await this.count({ where: { user_id, post_id } })
    }

    static async createUserLikePost(post_id: number, user_id: string) {
        return await this.create({ post_id, user_id, add_time: Date.now() })
    }

    static async delUserLikePost(post_id: number, user_id: string) {
        return await this.destroy({ where: { post_id, user_id, }})
    }
};
export default () => {
    return LikePost;
};

