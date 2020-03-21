import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Object representing cooking recipe' })
export class User {
    @Field()
    userId: string;

    @Field()
    userName: string;

    @Field()
    phoneNumber: string;

    @Field()
    passWord: string;

    @Field()
    img: string;

    @Field({
        nullable: true,
        description: 'The recipe description with preparation info',
    })
    name: string;

    @Field({
        nullable: true,
        description: 'The recipe description with preparation info',
    })
    signature: string;

    @Field({
        nullable: true,
        description: 'The recipe description with preparation info',
    })
    website: string;

    @Field({
        nullable: true,
        description: 'The recipe description with preparation info',
    })
    badge: number;

    // @Field()
    // addTime: string;

    @Field()
    fansNum: number;

    @Field()
    focusNum: number;

    @Field()
    focused: boolean;

    @Field()
    postNum: number;

}
