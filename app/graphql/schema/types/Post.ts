import { Field, ObjectType } from "type-graphql";
import { PostViewInfo } from "./PostViewInfo";


@ObjectType()
export class OwnerInfo {
    @Field()
    focused: boolean;

    @Field()
    userName: string;

    @Field()
    userId: string;
}

@ObjectType({ description: "Post表的字段类型" })
export class Post {
    @Field()
    postId: number;

    @Field()
    userId: string;

    @Field()
    content: string;

    @Field()
    addTime: string;

    @Field(() => PostViewInfo, { nullable: true })
    view_info: PostViewInfo;

    @Field(() => OwnerInfo /* , { nullable: true } */)
    owner_info: OwnerInfo;
}
