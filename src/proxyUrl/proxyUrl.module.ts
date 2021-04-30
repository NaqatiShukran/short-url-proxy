import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"
import { CqrsModule } from '@nestjs/cqrs';

import { eventSchema, UrlSchema } from "./proxyUrl.model";
import { UrlResolver } from "./proxyUrl.resolver";
import { UrlService } from "./proxyUrl.service";
import { QueryHandlers } from "./queries/handler";
import { CommandHandlers } from "./commands/handler";
import { EventHandlers } from "./events/handler";


@Module({
    imports: [
        MongooseModule.forFeature([{name: 'UrlCount' , schema: UrlSchema}]),
        MongooseModule.forFeature([{name: 'eventsSchemaDb' , schema: eventSchema}]),
        CqrsModule
    ],
    providers: [
        UrlService, 
        UrlResolver,
        ...CommandHandlers,
        ...QueryHandlers,
        ...EventHandlers
    ],
})

export class UrlModule {}