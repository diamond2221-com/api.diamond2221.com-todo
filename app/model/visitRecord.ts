/**
 * @desc 访客记录表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';
import { IVisitRecordType } from "../types/common";

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_visit_record'
})
export class VisitRecord extends Model<VisitRecord> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER("255"),
        comment: '主键 表ID'
    })
    id: number;

    @Column({
        type: STRING("255"),
        comment: "访问者的userID(副)"
    })
    user_id: string;

    @Column({
        type: STRING(255),
        comment: '访问者的userID(主)'
    })
    visit_user_id: string;

    @Column({
        type: INTEGER("2"),
        comment: '记录的用户来访的类型 1 访问的是用户的信息页面 2 访问的是用户的帖子'
    })
    type: number;

    @Column({
        type: STRING(13),
        comment: '添加的时间戳'
    })
    add_time: string;

    static async createVisitRecord(user_id: string, visit_user_id: string, type: IVisitRecordType) {
        return await this.create({
            user_id,
            visit_user_id,
            type,
            add_time: `${Date.now()}`
        })
    }
};
export default () => {
    return VisitRecord;
};

