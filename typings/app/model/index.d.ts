// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTodo from '../../../app/model/todo';
import ExportTodomodel from '../../../app/model/todomodel';
import ExportUser from '../../../app/model/user';
import ExportUsermodel from '../../../app/model/usermodel';

declare module 'egg' {
  interface IModel {
    Todo: ReturnType<typeof ExportTodo>;
    Todomodel: ReturnType<typeof ExportTodomodel>;
    User: ReturnType<typeof ExportUser>;
    Usermodel: ReturnType<typeof ExportUsermodel>;
  }
}
