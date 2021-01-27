// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTodo from '../../../app/controller/todo';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    todo: ExportTodo;
    user: ExportUser;
  }
}
