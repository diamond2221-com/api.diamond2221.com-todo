import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Comment表的字段类型' })
export class Comment {
    @Field()
    id: number;

    @Field()
    rId: number;

    @Field()
    pId: number;

    @Field()
    postId: number;

    @Field()
    userId: string;

    @Field()
    content: string;

    @Field()
    addTime: string;
}
