/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';
import { Op } from 'sequelize';

const { STRING, INTEGER, ENUM } = DataType;
import { IPostStatus } from "../types/post_interface"

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
        type: ENUM('1', '2', '3'),
        comment: `该帖子的状态：
                    1： 所有人可见
                    2：仅自己可见
                    3：所有人不可见（被删除）`,
        field: 'status'
    })
    status: IPostStatus;

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

    static async fetchPostsOpInPostIds(postIds: number[], status: IPostStatus = 1) {
        return await this.findAll({
            where: {
                postId: {
                    [Op.in]: postIds
                },
                status,
            }
        })
    }

    static async fetchAllPosts(page: number, size: number, /* status: IPostStatus = 1 */) {
        return await this.findAll({
            where: {
                [Op.or]: [
                    // {
                    //     userId: ownUserId,
                    //     status: {
                    //         [Op.in]: [1, 2]
                    //     }
                    // },
                    {
                        // userId: {
                        //     [Op.notLike]: ownUserId
                        // },
                        status: 1
                    }
                ]
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async countUserPostsByUserId(userId: string) {
        return await this.count({ where: { userId } })
    }

    static async createPost(content: string, userId: string, status: IPostStatus = 1) {
        return await this.create({
            content,
            userId,
            status,
            addTime: Date.now()
        })
    }

    static async fetchPostsOpLikeUserId(userId: string, size: number, page: number, status: IPostStatus[] = [1]) {
        return await this.findAll({
            where: {
                userId,
                status: {
                    [Op.in]: status
                },
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async fetchPostsOpInUserId(ownUserId: string, userIds: string[], size: number, page: number) {
        return await this.findAll({
            where: {
                [Op.or]: [
                    {
                        userId: {
                            [Op.in]: userIds
                        },
                        status: 1
                    },
                    {
                        userId: ownUserId,
                        status: [1, 2]
                    }
                ],
            },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async checkIsSelfPost(postId: number, userId: string) {
        return await this.findOne({ where: { postId, userId } })
    }

    static async updatePost(postId: number, status: IPostStatus) {
        console.log(status, postId)
        return await this.update({
            status
        }, {
            where: {
                postId
            }
        })
    }
};

export default () => {

    return Post
}
