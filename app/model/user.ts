/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import * as Sequelize from "sequelize"

const { STRING, INTEGER, CHAR } = DataType;
@Table({
    modelName: 'tbl_user'
})
export class User extends Model<User> {

    @PrimaryKey
    // @AutoIncrement
    @Column({
        type: STRING,
        comment: '用户ID user_id 唯一',
        field: 'user_id'
    })
    public userId: string;

    @Column({
        type: STRING(45),
        comment: "用户昵称 唯一",
        field: 'user_name'
    })
    public userName: string;

    @Column({
        type: CHAR(11),
        comment: "用户手机号 唯一",
        field: "phone_number",
    })
    public phoneNumber: string;


    @Column({
        type: STRING(54),
        comment: '用户密码',
        field: "pass_word",
    })
    public passWord: string;

    @Column({
        type: STRING,
        comment: "用户头像 完整路径",
        field: "img"
    })
    public img: string;

    @Column({
        type: STRING(30),
        comment: '用户真实姓名',
        field: "name"
    })
    public name: string;

    @Column({
        type: STRING,
        comment: '用户个性签名',
        field: "signature"
    })
    public signature: string;

    @Column({
        type: STRING,
        comment: '用户个人网站地址',
        field: "website"
    })
    public website: string;

    @Column({
        type: INTEGER('2'),
        comment: '用户是否拥有徽章',
        field: "badge"
    })
    public badge: number;

    @Column({
        type: STRING(13),
        comment: '用户注册时间',
        field: "add_time"
    })
    public addTime: string;

    @Column({
        type: STRING(13),
        comment: '用户最后一次登录时间',
        field: "last_time"
    })
    public lastTime: string;

    static async getUserInfoByUserId(userId: string) {
        return await this.findOne({
            where: {
                userId
            }
        });
    }

    static async getUserInfoByPhoneNumber(phoneNumber: string) {
        return await this.findOne({
            where: {
                phoneNumber
            }
        });
    }

    static async getUserInfoByUserName(userName: string) {
        return await this.findOne({
            where: {
                userName
            }
        });
    }

    static async updateUserInfo(newUserInfo, userId: string) {
        return await this.update(newUserInfo, { where: { userId } })
    }

    static async findAllUsersOrLikeUserName(userName: string) {
        return await this.findAll({
            where: {
                userName: {
                    [Sequelize.Op.like]: `%${userName}%`
                }
            }
        })
    }

    static async findUserOrNotEqUserIdAndUserName(userId: string, userName: string) {
        return await this.findOne({
            where: {
                userId: {
                    [Sequelize.Op.ne]: userId
                },
                userName
            }
        })
    }

    static async findUserOrNotEqUserIdAndPhoneNumber(userId: string, phoneNumber: string) {
        return await this.findOne({
            where: {
                userId: {
                    [Sequelize.Op.ne]: userId
                },
                phoneNumber
            }
        })
    }

    static async createUser(userId: string, userName: string, phoneNumber: string, passWord: string) {
        return this.create({
            userId,
            userName,
            phoneNumber,
            passWord,
            addTime: Date.now(),
            lastTime: Date.now()
        })
    }

    static async updateLastLoginTime(userId) {
        return this.update(
            { "lastTime": Date.now() },
            {
                where: {
                    userId
                }
            }
        )
    }

};



export default () => {
    return User;
}
