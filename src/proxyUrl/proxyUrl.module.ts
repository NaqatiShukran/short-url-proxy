import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"

import { UrlSchema } from "./proxyUrl.model";
import { UrlResolver } from "./proxyUrl.resolver";
import { UrlService } from "./proxyUrl.service";


@Module({
    imports: [MongooseModule.forFeature([{name: 'UrlCount' , schema: UrlSchema}])],
    providers: [UrlService, UrlResolver],
})

export class UrlModule {}