import { Test, TestingModule } from '@nestjs/testing';
import { UrlResolver } from '../proxyUrl.resolver';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppModule } from '../../app.module';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function insertOriginalUrl(app: INestApplication) {
    const mutation = `mutation{
        insertUrl(insertUrlData: {originalUrl: "https://stackoverflow.com/questions/"}){
            id,
            url,
            urlHash,
            shortUrl
        }
    }`;

    return request(app.getHttpServer())
    .post('http://localhost:4000/graphql')
    .send({ 
        operationName: null,
        variables: {},
        query: mutation
    })
    .then(res => {    
    console.log("console res", res);
    
    const insertedUrl = res.body.data;
    return insertedUrl;
    });
}

describe("Credentials (e2e). GRPC layer", () => {
    let app: INestApplication;
    let module: TestingModule;
    let resolver: UrlResolver;
    

    beforeAll(async () => {
        module = await Test.createTestingModule({
        providers: [UrlResolver],
        imports:[//AppModule,
            CqrsModule,
            // GraphQLModule.forRoot({
            //     autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            // })
        ]
    }).compile();

    resolver = module.get<UrlResolver>(UrlResolver);

    app = module.createNestApplication();
    await app.init();

    await delay(1000); // to make sure db ready
    });

    it('should be defined', ()=>{
        expect(resolver).toBeDefined();
    });

    it('should return url object after passing urlHash', async () => {
        const url = await insertOriginalUrl(app);
        console.log("cpnsole ", url);
        
        const originalUrl = url;
        
        const data = { 
        originalUrl: String
        };
        
        try {
        const resp = await resolver.insertUrl(originalUrl);
        expect(resp.id).toBeDefined();
        expect(resp.url).toBe('https://stackoverflow.com/questions/');
        expect(resp.urlHash).toBeDefined();
        expect(resp.shortUrl).toBeDefined();
        } catch (e) {
        console.log(e.message);
        } 
        });
});