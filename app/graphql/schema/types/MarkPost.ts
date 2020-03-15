import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'MarkPost表的字段类型' })
export class MarkPost {
    @Field()
    id: number;

    @Field()
    postId: number;

    @Field()
    userId: string;

    @Field()
    addTime: string;
}
