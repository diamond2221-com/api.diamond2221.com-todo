// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTodo from '../../../app/controller/todo';

declare module 'egg' {
  interface IController {
    todo: ExportTodo;
  }
}
