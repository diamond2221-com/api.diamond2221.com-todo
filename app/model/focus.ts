/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table, ForeignKey, /* BelongsTo */ } from 'sequelize-typescript';
import { User } from './user';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_focus'
})
export class Focus extends Model<Focus> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER("255"),
        comment: '图片的ID'
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: STRING("255"),
        comment: "关注用户的主ID"
    })
    user_id: string;

    @Column({
        type: STRING(255),
        comment: '关注用户的副ID'
    })
    focus_user_id: string;

    @Column({
        type: STRING(13),
        comment: '添加的时间戳'
    })
    add_time: string;

    // @BelongsTo(() => User, "user_id")
    // focus_user: Focus

    static async getUserFocusUser(user_id: string, focus_user_id: string) {
        return await this.count({
            where: {
                user_id,
                focus_user_id
            }
        })
    }
};
export default () => {

    return Focus;
};

