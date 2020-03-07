/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';
import { Op } from 'sequelize';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_post'
})
export class Post extends Model<Post> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER("100"),
        comment: '帖子id 唯一',
        field: 'post_id'
    })
    postId: number;

    @Column({
        type: STRING,
        comment: "关联用户的id",
        field: 'user_id'
    })
    userId: string;

    @Column({
        type: STRING(100),
        comment: '发帖时的文本内容',
        field: 'content'
    })
    content: string;

    @Column({
        type: STRING(13),
        comment: '发帖的时间戳',
        field: 'add_time'
    })
    addTime: string;

    static async fetchPostByPostId(postId: number) {
        return await this.findOne({
            where: {
                postId
            }
        })
    }

    static async fetchPostsOpInPostIds(postIds: number[]) {
        return await this.findAll({
            where: {
                postId: {
                    [Op.in]: postIds
                }
            }
        })
    }

    static async fetchAllPosts(page: number, size: number) {
        return await this.findAll({
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async countUserPostsByUserId(userId: string) {
        return await this.count({ where: { userId } })
    }

    static async createPost(content: string, userId: string) {
        return await this.create({
            content,
            userId,
            addTime: Date.now()
        })
    }

    static async fetchPostsOpInUserId(userIds: string[], size: number, page: number) {
        return await this.findAll({
            where: {
                userId: {
                    [Op.in]: userIds
                }
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async checkIsSelfPost(postId: number, userId: string) {
        return await this.findOne({ where: { postId, userId } })
    }
};

export default () => {

    return Post
}
