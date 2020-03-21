import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Post的附加属性字段类型' })
export class PostViewInfo {
    @Field()
    liked: boolean = false;

    @Field()
    marked: boolean = false

    @Field()
    likeNum: number = 0;
}
