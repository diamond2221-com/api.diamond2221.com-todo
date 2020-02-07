// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccountsChangePassword from '../../../app/controller/accounts/changePassword';
import ExportAccountsLogin from '../../../app/controller/accounts/login';
import ExportAccountsRegister from '../../../app/controller/accounts/register';
import ExportCommonsUploadImages from '../../../app/controller/commons/uploadImages';
import ExportPostsComment from '../../../app/controller/posts/comment';
import ExportPostsIndex from '../../../app/controller/posts/index';
import ExportPostsLikePost from '../../../app/controller/posts/likePost';
import ExportPostsMarkPost from '../../../app/controller/posts/markPost';
import ExportPostsUser from '../../../app/controller/posts/user';
import ExportUsersFans from '../../../app/controller/users/fans';
import ExportUsersFocus from '../../../app/controller/users/focus';
import ExportUsersIndex from '../../../app/controller/users/index';
import ExportUsersInfo from '../../../app/controller/users/info';
import ExportUsersSearch from '../../../app/controller/users/search';
import ExportUsersUpdate from '../../../app/controller/users/update';

declare module 'egg' {
  interface IController {
    accounts: {
      changePassword: ExportAccountsChangePassword;
      login: ExportAccountsLogin;
      register: ExportAccountsRegister;
    }
    commons: {
      uploadImages: ExportCommonsUploadImages;
    }
    posts: {
      comment: ExportPostsComment;
      index: ExportPostsIndex;
      likePost: ExportPostsLikePost;
      markPost: ExportPostsMarkPost;
      user: ExportPostsUser;
    }
    users: {
      fans: ExportUsersFans;
      focus: ExportUsersFocus;
      index: ExportUsersIndex;
      info: ExportUsersInfo;
      search: ExportUsersSearch;
      update: ExportUsersUpdate;
    }
  }
}
