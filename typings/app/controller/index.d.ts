// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccountsChangePassword from '../../../app/controller/accounts/changePassword';
import ExportAccountsLogin from '../../../app/controller/accounts/login';
import ExportAccountsRegister from '../../../app/controller/accounts/register';
import ExportCommonsUploadImages from '../../../app/controller/commons/uploadImages';
import ExportPostsAdd from '../../../app/controller/posts/add';
import ExportPostsAll from '../../../app/controller/posts/all';
import ExportPostsComment from '../../../app/controller/posts/comment';
import ExportPostsDetail from '../../../app/controller/posts/detail';
import ExportPostsIndex from '../../../app/controller/posts/index';
import ExportPostsLike from '../../../app/controller/posts/like';
import ExportPostsMark from '../../../app/controller/posts/mark';
import ExportPostsUser from '../../../app/controller/posts/user';
import ExportRecordVisit from '../../../app/controller/record/visit';
import ExportUsersFans from '../../../app/controller/users/fans';
import ExportUsersFocus from '../../../app/controller/users/focus';
import ExportUsersIndex from '../../../app/controller/users/index';
import ExportUsersInfo from '../../../app/controller/users/info';
import ExportUsersSearch from '../../../app/controller/users/search';
import ExportUsersSuggested from '../../../app/controller/users/suggested';
import ExportUsersUpdate from '../../../app/controller/users/update';
import ExportAccountsSignUpSms from '../../../app/controller/accounts/signUp/sms';
import ExportAccountsSignUpVerify from '../../../app/controller/accounts/signUp/verify';
import ExportUsersPhoneSms from '../../../app/controller/users/phone/sms';
import ExportUsersPhoneUpdate from '../../../app/controller/users/phone/update';
import ExportUsersPhoneVerify from '../../../app/controller/users/phone/verify';

declare module 'egg' {
  interface IController {
    accounts: {
      changePassword: ExportAccountsChangePassword;
      login: ExportAccountsLogin;
      register: ExportAccountsRegister;
      signUp: {
        sms: ExportAccountsSignUpSms;
        verify: ExportAccountsSignUpVerify;
      }
    }
    commons: {
      uploadImages: ExportCommonsUploadImages;
    }
    posts: {
      add: ExportPostsAdd;
      all: ExportPostsAll;
      comment: ExportPostsComment;
      detail: ExportPostsDetail;
      index: ExportPostsIndex;
      like: ExportPostsLike;
      mark: ExportPostsMark;
      user: ExportPostsUser;
    }
    record: {
      visit: ExportRecordVisit;
    }
    users: {
      fans: ExportUsersFans;
      focus: ExportUsersFocus;
      index: ExportUsersIndex;
      info: ExportUsersInfo;
      search: ExportUsersSearch;
      suggested: ExportUsersSuggested;
      update: ExportUsersUpdate;
      phone: {
        sms: ExportUsersPhoneSms;
        update: ExportUsersPhoneUpdate;
        verify: ExportUsersPhoneVerify;
      }
    }
  }
}
