import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"

import { UrlController } from "./proxyUrl.controller";
import { UrlSchema } from "./proxyUrl.model";
import { UrlService } from "./proxyUrl.service";


@Module({
    imports: [MongooseModule.forFeature([{name: 'UrlCount' , schema: UrlSchema}])],
    controllers: [UrlController],
    providers: [UrlService],
})

export class UrlModule {}