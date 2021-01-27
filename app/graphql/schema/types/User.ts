import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: '用户信息' })
export class User {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    phone: string;

    @Field()
    add_time: string;

    @Field()
    up_time: string;

    @Field()
    upd_time: Date;
}
