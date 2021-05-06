import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Mongoose } from 'mongoose';
import { UrlSchema } from './proxyUrl.model';
import { UrlService } from './proxyUrl.service';
import { UrlModule } from './proxyUrl.module'

describe('UrlService', () => {
    let service: UrlService;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                UrlModule, 
                MongooseModule.forFeature([{name: 'UrlCount' , schema: UrlSchema}]),
            ],
            providers: [UrlService]
        }).compile();

        service = module.get<UrlService>(UrlService)
    });

    it('should be defined',() => {
        
        expect(service).toBeDefined();
    });
});