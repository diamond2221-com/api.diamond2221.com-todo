import { Application } from 'egg';
import { STRING, INTEGER, DATE } from 'sequelize'

export default function (app: Application) {
    const User = app.model.define(
        'tbl_user',
        {
            id: {
                type: INTEGER,
                comment: '主键id',
                field: 'id',
                primaryKey: true,
                autoIncrement: true, // 自动增长
            },
            name: {
                type: STRING(255),
                comment: "name",
                field: 'name'
            },
            phone: {
                type: STRING(11),
                field: 'phone'
            },
            add_time: {
                type: STRING(13),
                field: 'add_time'
            },
            up_time: {
                type: STRING(13),
                field: 'up_time'
            },
            upd_time: {
                type: DATE('string'),
                field: 'upd_time'
            }
        },
        {
            // timestamps: false, // 去除createAt updateAt
            createdAt: false, // 表示不启用created_at
            updatedAt: false, // 表示不启用updated_at
            freezeTableName: true, // 使用自定义表名
            // 使用自定义表名之后上面写的users就直接就是你的表名，如果不加的话，你就可以写user，但是自己的表名为users，程序会自动将s加上
            tableName: 'tbl_user', // 自定义的表名，也可以不写，直接用define后面的也可以
            // 只要你使用了freezeTableName，程序就不会自动给你加上s了
        }
    );
    class UserModel extends User {
        static associate() {
            app.model.Usermodel.hasMany(app.model.Todomodel, { foreignKey: 'addUser' });
        }
    }
    return UserModel;
}
