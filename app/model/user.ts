/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import * as Sequelize from "sequelize"
// import { Focus } from './focus';

const { STRING, INTEGER, CHAR } = DataType;
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
        type: CHAR(11),
        comment: "用户手机号 唯一"
    })
    phone_number: string;


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

    static async getUserInfoByUserId(user_id: string) {
        return await this.findOne({
            where: {
                user_id
            }
        });
    }

    static async getUserInfoByPhoneNumber(phone_number: string) {
        return await this.findOne({
            where: {
                phone_number
            }
        });
    }

    static async getUserInfoByUserName(user_name: string) {
        return await this.findOne({
            where: {
                user_name
            }
        });
    }

    static async updateUserInfo(newUserInfo, user_id: string) {
        return await this.update(newUserInfo, { where: { user_id } })
    }

    static async findAllUsersOrLikeUserName(userName: string) {
        return await this.findAll({
            where: {
                user_name: {
                    [Sequelize.Op.like]: `%${userName}%`
                }
            }
        })
    }

    static async findUserOrNotEqUserIdAndUserName(user_id: string, user_name: string) {
        return await this.findOne({
            where: {
                user_id: {
                    [Sequelize.Op.ne]: user_id
                },
                user_name
            }
        })
    }

    static async findUserOrNotEqUserIdAndPhoneNumber(user_id: string, phone_number: string) {
        return await this.findOne({
            where: {
                user_id: {
                    [Sequelize.Op.ne]: user_id
                },
                phone_number
            }
        })
    }

    static async createUser(user_id: string, user_name: string, phone_number: string, pass_word: string) {
        return this.create({
            user_id,
            user_name,
            phone_number,
            pass_word,
            add_time: Date.now(),
            last_time: Date.now()
        })
    }

    static async updateLastLoginTime(user_id) {
        return this.update(
            { "last_time": Date.now() },
            {
                where: {
                    user_id
                }
            }
        )
    }

};

export type IUser = User;
export default () => {
    return User;
}
