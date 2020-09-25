import { Application } from 'egg';
import UserRouter from "./router/todo";

export default (app: Application) => {
    UserRouter(app);
};
