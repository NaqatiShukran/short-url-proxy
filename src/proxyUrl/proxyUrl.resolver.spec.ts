import { Test, TestingModule } from '@nestjs/testing';
import { UrlResolver } from './proxyUrl.resolver';
import { INestApplication } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
// import { AppModule } from 'src/app.module';
import { CqrsModule } from '@nestjs/cqrs';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("resolver", () => {
    let app: INestApplication;
    let module: TestingModule;
    let resolver: UrlResolver;
    

    beforeAll(async () => {
        module = await Test.createTestingModule({
        providers: [UrlResolver],
        imports:[CqrsModule]
    }).compile();

    resolver = module.get<UrlResolver>(UrlResolver);

    app = module.createNestApplication();
    await app.init();

    await delay(1000); // to make sure db ready
    });


    it('should be defined', ()=>{
        expect(resolver).toBeDefined();
    });

});