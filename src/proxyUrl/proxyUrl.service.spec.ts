import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Mongoose } from 'mongoose';
import { UrlCount } from './proxyUrl.model';
import { UrlService } from './proxyUrl.service';


describe('UrlService', () => {
    let service: UrlService;

    
        
    
    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UrlService]
        }).compile();

        service = module.get<UrlService>(UrlService)
    });

    it('should be defined',() => {
        
        expect(service.getCount).toBeDefined();
    });
});