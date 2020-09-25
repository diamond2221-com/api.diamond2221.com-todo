import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Object representing cooking recipe' })
export class BaseInfo {
    @Field()
    id: number;

    @Field()
    name: string;
}
