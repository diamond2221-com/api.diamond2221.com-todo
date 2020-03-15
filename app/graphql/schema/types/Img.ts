import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Img表的字段类型' })
export class Img {
    @Field()
    imgId: number;

    @Field()
    postId: number;

    @Field()
    src: string;

    @Field()
    addTime: string;
}
