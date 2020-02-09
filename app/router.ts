import { Application } from 'egg';
import CommonRouter from "./router/common";
import PostRouter from "./router/post";
import AccountRouter from "./router/account";
import UserRouter from "./router/user";

export default (app: Application) => {
    CommonRouter(app);
    PostRouter(app);
    AccountRouter(app);
    UserRouter(app);
};
