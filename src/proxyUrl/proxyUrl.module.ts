import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"
import { CqrsModule } from '@nestjs/cqrs';

import { UrlSchema } from "./proxyUrl.model";
import { UrlResolver } from "./proxyUrl.resolver";
import { UrlService } from "./proxyUrl.service";
import { QueryHandlers } from "./queries/handler";
import { CommandHandlers } from "./commands/handler";
import { EventHandlers } from "./events/handler";
import { EventSourcingModule } from "event-sourcing-nestjs";
import { GraphQLModule } from "@nestjs/graphql";


@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([{name: 'UrlCount' , schema: UrlSchema}]),
        EventSourcingModule.forRoot({
            mongoURL: 'mongodb://localhost:27017/eventstore'
        }),
        EventSourcingModule.forFeature(),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }), 
    ],
    providers: [
        UrlService, 
        UrlResolver,
        ...CommandHandlers,
        ...QueryHandlers,
        ...EventHandlers
    ],
    exports:[
        UrlService, 
        UrlResolver,
    ]
})

export class UrlModule {}