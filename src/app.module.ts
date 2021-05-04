import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSourcingModule } from 'event-sourcing-nestjs';


import { UrlModule } from './proxyUrl/proxyUrl.module';


@Module({
  imports: [
    UrlModule, 
    MongooseModule.forRoot('mongodb+srv://dbUser:Password@urlshortner.pjx1v.mongodb.net/urlShortnerCount?retryWrites=true&w=majority'),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    EventSourcingModule.forRoot({
      mongoURL: 'mongodb://localhost:27017/eventstore'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
