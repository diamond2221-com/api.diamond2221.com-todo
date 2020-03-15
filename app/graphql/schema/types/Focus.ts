import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Focus表的字段类型' })
export class Focus {
    @Field()
    id: number;

    @Field()
    userId: string;

    @Field()
    focusUserId: string;

    @Field()
    addTime: string;
}
