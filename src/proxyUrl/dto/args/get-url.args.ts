import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";


@ArgsType()
export class GetUrlArgs{
    @Field()
    @IsNotEmpty()
    urlHash: string;
}