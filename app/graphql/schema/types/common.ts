import { ObjectType, Field } from "type-graphql";


@ObjectType()
export class Response {
    @Field()
    data!: string;

    @Field()
    code: number;

    @Field()
    message: string;
}
