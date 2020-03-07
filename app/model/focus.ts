/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table, /* ForeignKey */ /* BelongsTo */ } from 'sequelize-typescript';
// import { User } from './user';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_focus'
})
export class Focus extends Model<Focus> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER("255"),
        comment: '图片的ID',
        field: "id"
    })
    id: number;

    // @ForeignKey(() => User)
    @Column({
        type: STRING("255"),
        comment: "关注用户的主ID",
        field: "user_id"
    })
    userId: string;

    @Column({
        type: STRING(255),
        comment: '关注用户的副ID',
        field: "focus_user_id"
    })
    focusUserId: string;

    @Column({
        type: STRING(13),
        comment: '添加的时间戳',
        field: "add_time"
    })
    addTime: string;

    // @BelongsTo(() => User, "userId")
    // focus_user: Focus

    static async fetchFocusList(focusUserId: string, page: number, size: number) {
        return await this.findAll({
            where: { focusUserId },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }

    static async fetchFansList(userId: string, page: number, size: number) {
        return await this.findAll({
            where: { userId },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
    }


    static async getUserFocusUser(userId: string, focusUserId: string) {
        return await this.count({
            where: {
                userId,
                focusUserId
            }
        })
    }

    static async getUserFansNum(userId: string) {
        return await this.count({ where: { userId } })
    }

    static async getUserFocusNum(focusUserId: string) {
        return await this.count({ where: { focusUserId } })
    }

    static async findFocusUser(userId: string, focusUserId: string) {
        return await this.findOne({
            where: {
                user_id: userId,
                focus_user_id: focusUserId
            }
        })
    }

    static async createFocus(userId: string, focusUserId: string) {
        return await this.create({
            userId,
            focusUserId,
            addTime: Date.now()
        })
    }

    static async destroyFocus(userId: string, focusUserId: string) {
        return await this.destroy({ where: { userId, focusUserId } })
    }
};

export default () => Focus;

