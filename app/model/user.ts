/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_user'
})
export class User extends Model<User> {

    @PrimaryKey
    // @AutoIncrement
    @Column({
        type: STRING,
        comment: '用户ID user_id 唯一'
    })
    user_id: string;

    @Column({
        type: STRING(45),
        comment: "用户昵称 唯一"
    })
    user_name: string;

    @Column({
        type: STRING(54),
        comment: '用户密码'
    })
    pass_word: string;

    @Column({
        type: STRING,
        comment: "用户头像 完整路径"
    })
    img: string;

    @Column({
        type: STRING(30),
        comment: '用户真实姓名',
    })
    name: string;

    @Column({
        type: STRING,
        comment: '用户个性签名'
    })
    signature: string;

    @Column({
        type: STRING,
        comment: '用户个人网站地址'
    })
    website: string;

    @Column({
        type: INTEGER('2'),
        comment: '用户是否拥有徽章'
    })
    badge: number;

    @Column({
        type: STRING(13),
        comment: '用户注册时间'
    })
    add_time: string;

    @Column({
        type: STRING(13),
        comment: '用户最后一次登录时间'
    })
    last_time: string;
};
export default () => {
    return User;
};

