// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTodo from '../../../app/service/todo';

declare module 'egg' {
  interface IService {
    todo: ExportTodo;
  }
}
