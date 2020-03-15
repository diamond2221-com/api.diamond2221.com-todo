import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Post表的字段类型' })
export class Post {
    @Field()
    postId: number;

    @Field()
    userId: string;

    @Field()
    content: string;

    @Field()
    addTime: string;
}
