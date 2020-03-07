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
        comment: '主键 表ID',
        field: 'id'
    })
    id: number;

    @Column({
        type: STRING("255"),
        comment: "访问者的userID(副)",
        field: 'user_id'
    })
    userId: string;

    @Column({
        type: STRING(255),
        comment: '访问者的userID(主)',
        field: 'visit_user_id'
    })
    visitUserId: string;

    @Column({
        type: INTEGER("2"),
        comment: '记录的用户来访的类型 1 访问的是用户的信息页面 2 访问的是用户的帖子',
        field: 'type'
    })
    type: number;

    @Column({
        type: STRING(13),
        comment: '添加的时间戳',
        field: 'add_time'
    })
    addTime: string;

    static async createVisitRecord(userId: string, visitUserId: string, type: IVisitRecordType) {
        return await this.create({
            userId,
            visitUserId,
            type,
            addTime: `${Date.now()}`
        })
    }
};

export default () => VisitRecord;

