// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCommon from '../../../app/controller/common';
import ExportPost from '../../../app/controller/post';
import ExportUser from '../../../app/controller/user';
import ExportAccountsLogin from '../../../app/controller/accounts/login';
import ExportAccountsRegister from '../../../app/controller/accounts/register';
import ExportCommonsIndex from '../../../app/controller/commons/index';
import ExportPostsComment from '../../../app/controller/posts/comment';
import ExportPostsIndex from '../../../app/controller/posts/index';
import ExportPostsMarkPost from '../../../app/controller/posts/markPost';
import ExportPostsUser from '../../../app/controller/posts/user';

declare module 'egg' {
  interface IController {
    common: ExportCommon;
    post: ExportPost;
    user: ExportUser;
    accounts: {
      login: ExportAccountsLogin;
      register: ExportAccountsRegister;
    }
    commons: {
      index: ExportCommonsIndex;
    }
    posts: {
      comment: ExportPostsComment;
      index: ExportPostsIndex;
      markPost: ExportPostsMarkPost;
      user: ExportPostsUser;
    }
  }
}
