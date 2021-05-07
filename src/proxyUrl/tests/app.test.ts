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
            insertUrl(insertUrlData: {originalUrl: "https://github.com/NaqatiShukran/"}){
                id,
                url,
                urlHash,
                shortUrl
            }
        }`;

    return request(app.getHttpServer())
        .post('/graphql')
        .send({
        operationName: null,
        variables: {},
        query: mutation,
        })
        .then((res) => {
        const insertedUrl = res.body.data;
        return insertedUrl.insertUrl;
        });
    }

    async function getOriginalUrl(app: INestApplication) {
        const query = `{
            getUrl(urlHash:"wTM6BewhTtEKexGPBLwEpX"){
                url,
                urlHash
            }
        }`;
    
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: query,
            })
            .then((res) => {
            const returnedUrl = res.body.data;
            return returnedUrl.getUrl;
            });
        }

    async function getUrlAndCount(app: INestApplication) {
        const query = `{
            getUrlCount(urlHash:"wTM6BewhTtEKexGPBLwEpX"){
                urlName
                urlCount
            }
        }`;
    
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: query,
            })
            .then((res) => {
            const urlAndCount = res.body.data;
            return urlAndCount.getUrlCount;
            });
        }

    describe('Credentials (e2e). GRPC layer', () => {
    let app: INestApplication;
    let module: TestingModule;
    let resolver: UrlResolver;

    beforeAll(async () => {
        module = await Test.createTestingModule({
        providers: [UrlResolver],
        imports: [AppModule, CqrsModule],
        }).compile();

        resolver = module.get<UrlResolver>(UrlResolver);

        app = module.createNestApplication();
        await app.init();

        await delay(1000); // to make sure db ready
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should return url and short url ater passing original url', async () => {
        // try {
        const url = await insertOriginalUrl(app);
        // console.log("cpnsole ", url);
        expect(url.id).toBeDefined();
        expect(url.url).toBe('https://github.com/NaqatiShukran/');
        expect(url.urlHash).toBeDefined();
        expect(url.shortUrl).toBeDefined();

        const urlData = await resolver.getUrl({urlHash: url.urlHash});
        expect(urlData.id).toBe(url.id);
        expect(urlData.url).toBe('https://github.com/NaqatiShukran/');
        expect(urlData.urlHash).toBe(url.urlHash);
        expect(urlData.shortUrl).toBe(url.shortUrl);

        // const urlCount =  await resolver.getUrlCount({urlHash: url.urlHash});
        // expect(urlCount.urlName).toBe('https://github.com/NaqatiShukran/');
        // expect(urlCount.urlCount).toBeDefined();


        // } catch (e) {
        // console.log(e.message);
        // }
    });

    it('should return url object after passing urlHash', async () => {
        // try {
        const getUrl = await getOriginalUrl(app);
        console.log("console url ", getUrl);
        expect(getUrl.url).toBeDefined();
        expect(getUrl.urlHash).toBe('wTM6BewhTtEKexGPBLwEpX');

        const urlCount =  await resolver.getUrlCount({urlHash: getUrl.urlHash});
        expect(urlCount.urlName).toBe(getUrl.url);
        expect(urlCount.urlCount).toBeDefined();

        // } catch (e) {
        // console.log(e.message);
        // }
    });

    it('should return url and count after passing urlHash', async () => {
        // try {
        const urlAndCount = await getUrlAndCount(app);
        console.log("console url ", getUrlAndCount);
        expect(urlAndCount.urlName).toBeDefined();
        expect(urlAndCount.urlCount).toBeDefined();
        // } catch (e) {
        // console.log(e.message);
        // }
    });
});
