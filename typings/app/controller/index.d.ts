// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/controller/account';
import ExportCommon from '../../../app/controller/common';
import ExportPost from '../../../app/controller/post';

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    common: ExportCommon;
    post: ExportPost;
  }
}
