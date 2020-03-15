import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'VisitRecord表的字段类型' })
export class VisitRecord {
    @Field()
    id: number;

    @Field()
    userId: string;

    @Field()
    visitUserId: string;

    @Field()
    type: number;

    @Field()
    addTime: string;
}
