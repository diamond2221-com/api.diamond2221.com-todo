/**
 * @desc 用户表
 */
import { Column, DataType, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';

const { STRING, INTEGER } = DataType;
@Table({
    modelName: 'tbl_img'
})
export class Img extends Model<Img> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: INTEGER("255"),
        comment: '图片的ID'
    })
    img_id: number;

    @Column({
        type: INTEGER("255"),
        comment: "当前图片对应的帖子ID"
    })
    post_id: number;

    @Column({
        type: STRING(255),
        comment: '当前图片的地址'
    })
    src: string;

    @Column({
        type: STRING(13),
        comment: '添加图片时的时间戳'
    })
    add_time: string;
};
export default () => {
    return Img;
};

