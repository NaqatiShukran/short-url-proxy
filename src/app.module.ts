import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './proxyUrl/proxyUrl.module';

@Module({
  imports: [UrlModule, MongooseModule.forRoot('mongodb+srv://dbUser:Password@urlshortner.pjx1v.mongodb.net/urlShortnerCount?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
