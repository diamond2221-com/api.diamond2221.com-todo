// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportComment from '../../../app/model/comment';
import ExportFocus from '../../../app/model/focus';
import ExportImg from '../../../app/model/img';
import ExportLikePost from '../../../app/model/likePost';
import ExportMarkPost from '../../../app/model/markPost';
import ExportPost from '../../../app/model/post';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Comment: ReturnType<typeof ExportComment>;
    Focus: ReturnType<typeof ExportFocus>;
    Img: ReturnType<typeof ExportImg>;
    LikePost: ReturnType<typeof ExportLikePost>;
    MarkPost: ReturnType<typeof ExportMarkPost>;
    Post: ReturnType<typeof ExportPost>;
    User: ReturnType<typeof ExportUser>;
  }
}
