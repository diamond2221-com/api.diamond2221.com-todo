// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccountsChangePassword from '../../../app/controller/accounts/changePassword';
import ExportAccountsLogin from '../../../app/controller/accounts/login';
import ExportAccountsRegister from '../../../app/controller/accounts/register';
import ExportCommonsUploadImages from '../../../app/controller/commons/uploadImages';
import ExportPostsAdd from '../../../app/controller/posts/add';
<<<<<<< HEAD
import ExportPostsAll from '../../../app/controller/posts/all';
=======
>>>>>>> 03e8b4ffe91a27b0cf7e11f3d21f8d20d5e1b03f
import ExportPostsComment from '../../../app/controller/posts/comment';
import ExportPostsDetail from '../../../app/controller/posts/detail';
import ExportPostsIndex from '../../../app/controller/posts/index';
import ExportPostsLikePost from '../../../app/controller/posts/likePost';
import ExportPostsList from '../../../app/controller/posts/list';
import ExportPostsMarkPost from '../../../app/controller/posts/markPost';
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
      add: ExportPostsAdd;
<<<<<<< HEAD
      all: ExportPostsAll;
=======
>>>>>>> 03e8b4ffe91a27b0cf7e11f3d21f8d20d5e1b03f
      comment: ExportPostsComment;
      detail: ExportPostsDetail;
      index: ExportPostsIndex;
      likePost: ExportPostsLikePost;
      list: ExportPostsList;
      markPost: ExportPostsMarkPost;
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
