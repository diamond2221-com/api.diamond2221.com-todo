// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccounts from '../../../app/service/accounts';
import ExportComment from '../../../app/service/comment';
import ExportPost from '../../../app/service/post';
import ExportRecord from '../../../app/service/record';
import ExportTransform from '../../../app/service/transform';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    accounts: ExportAccounts;
    comment: ExportComment;
    post: ExportPost;
    record: ExportRecord;
    transform: ExportTransform;
    user: ExportUser;
  }
}
