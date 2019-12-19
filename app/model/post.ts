/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';

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
};
export default () => {
    // let searchUser = async () => {
    //     return await User.findAll({
    //         attributes: [Sequelize.col('u.user_id'), 'name', 'img'],
    //         include: [{
    //             model: User,
    //             as: 'u',
    //             attributes: []
    //         }],
    //         where: {
    //             "pass_word": '615bacc7f5c37188391a971cb8efadcc',
    //             '$u.add_time$': 1566051869856
    //         },
    //         raw: true
    //     })
    // }

    return Post;
};

