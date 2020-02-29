// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccounts from '../../../app/service/accounts';
import ExportPost from '../../../app/service/post';
import ExportRecord from '../../../app/service/record';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    accounts: ExportAccounts;
    post: ExportPost;
    record: ExportRecord;
    user: ExportUser;
  }
}
