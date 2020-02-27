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
        comment: '帖子id 唯一'
    })
    post_id: number;

    @Column({
        type: STRING,
        comment: "关联用户的id"
    })
    user_id: string;

    @Column({
        type: STRING(100),
        comment: '发帖时的文本内容'
    })
    content: string;

    @Column({
        type: STRING(13),
        comment: '发帖的时间戳'
    })
    add_time: string;

    static async fetchPostByPostId(post_id: number) {
        return await this.findOne({
            where: {
                post_id
            }
        })
    }

    static async fetchPostsOpInPostIds(postIds: number[]) {
        return await this.findAll({
            where: {
                post_id: {
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

    static async countUserPostsByUserId(user_id: string) {
        return await this.count({ where: { user_id } })
    }

    static async createPost(content: string, user_id: string) {
        return await this.create({
            content,
            user_id,
            add_time: Date.now()
        })
    }

    static async fetchPostsOpInUserId(userIds: string[], size: number, page: number) {
        return await this.findAll({
            where: {
                user_id: {
                    [Op.in]: userIds
                }
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }
};
export default () => {
    return Post;
};

