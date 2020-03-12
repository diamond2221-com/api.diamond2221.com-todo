export interface IBasePost {
    postId: number;
    userId: string;
    content: string;
    addTime: string;
}
export interface IUserPost extends IBasePost {
    imgs?: string[];
    likeNum: number;
    comment: IPostCommentRes
}
export interface PostAllInfo extends IUserPost {
    userName: string;
    img: string;
    liked: boolean;
    marked: boolean;
    focused: boolean;
}
export interface IPostComment extends BaseComment {
    userName: string;
    userImg: string;
}


export interface BaseComment {
    id: number;
    content: string;
    rId: number;
    addTime: string;
    postId: number;
    userId: string;
}

export interface IPostComments extends IPostComment {
    edges: {
        count: number;
        edges: IPostComment[]
    };
}

export interface IPostCommentRes {
    edges: {
        edges: IPostComments[],
        count: number;
    };
    count: number;
}
