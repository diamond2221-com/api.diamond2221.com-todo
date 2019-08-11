// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/service/account';
import ExportPost from '../../../app/service/post';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    account: ExportAccount;
    post: ExportPost;
    user: ExportUser;
  }
}
