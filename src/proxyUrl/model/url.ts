import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UrlGraph {
    @Field()
    id: string;

    @Field()
    url: string;

    @Field()
    urlHash: string;

    @Field()
    shortUrl: string;
}

@ObjectType()
export class UrlCountGraph {
    @Field()
    urlName: string;

    @Field(() => Int)
    urlCount: number;
}