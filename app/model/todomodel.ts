import { Application } from 'egg';
import { STRING, INTEGER } from 'sequelize'

export default (app: Application) => {
    const Todo = app.model.define(
        'tbl_todo',
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
                comment: "主题",
                field: 'name'
            },
            desc: {
                type: STRING(255),
                comment: "desc",
                field: 'desc'
            },
            addUser: {
                type: INTEGER,
                comment: '添加用户',
                field: 'add_user'
            }
        },
        {
            // timestamps: false, // 去除createAt updateAt
            createdAt: false, // 表示不启用created_at
            updatedAt: false, // 表示不启用updated_at
            freezeTableName: true, // 使用自定义表名
            // 使用自定义表名之后上面写的users就直接就是你的表名，如果不加的话，你就可以写user，但是自己的表名为users，程序会自动将s加上
            tableName: 'tbl_todo', // 自定义的表名，也可以不写，直接用define后面的也可以
            // 只要你使用了freezeTableName，程序就不会自动给你加上s了
        }
    );
    class TodoModel extends Todo {
        static associate() {
            app.model.Todomodel.belongsTo(app.model.Usermodel, { as: 'user', foreignKey: 'addUser', targetKey: 'id' });
        }
    };
    return TodoModel;
}
