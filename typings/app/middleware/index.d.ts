// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthorization from '../../../app/middleware/authorization';

declare module 'egg' {
  interface IMiddleware {
    authorization: typeof ExportAuthorization;
  }
}
