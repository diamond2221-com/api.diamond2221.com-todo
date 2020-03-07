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
        comment: '图片的ID',
        field: "img_id"
    })
    imgId: number;

    @Column({
        type: INTEGER("255"),
        comment: "当前图片对应的帖子ID",
        field: "post_id"
    })
    postId: number;

    @Column({
        type: STRING(255),
        comment: '当前图片的地址',
        field: "src"
    })
    src: string;

    @Column({
        type: STRING(13),
        comment: '添加图片时的时间戳',
        field: "add_time"
    })
    addTime: string;

    static async fetchPostAllImgs(postId: number) {
        return await this.findAll({
            where: {
                postId
            },
            order: [
                ["add_time", "DESC"]
            ]
        })
    }

    static async createImg(postId: number, img: string) {
        return await this.create({
            postId,
            src: img,
            addTime: Date.now()
        })
    }
};

export default () => Img;
