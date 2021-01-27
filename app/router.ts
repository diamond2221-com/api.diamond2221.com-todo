import { Application } from 'egg';
import UserRouter from './router/user'
import TodoRouter from "./router/todo";

export default (app: Application) => {
    TodoRouter(app);
    UserRouter(app);
};
