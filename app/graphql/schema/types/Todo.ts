import { Field, ObjectType } from 'type-graphql';
import { TodoStatus } from '../../../types/todo';

@ObjectType()
export class Todo {

    @Field()
    id: number;

    @Field()
    addUser: number;

    @Field()
    desc: string;

    @Field()
    expirTime: string;

    @Field()
    name: string;

    @Field()
    upTime: string;

    @Field()
    status: TodoStatus

    @Field()
    addTime: string;
}

@ObjectType({ description: '不知道这是什么 Object representing cooking recipe' })
export class TodoResult {
    @Field()
    count: number

    @Field(() => Todo)
    rows?: Todo[]

}
