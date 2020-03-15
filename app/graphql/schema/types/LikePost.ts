import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'LikePost表的字段类型' })
export class LikePost {
    @Field()
    id: number;

    @Field()
    postId: number;

    @Field()
    userId: string;

    @Field()
    addTime: string;
}
