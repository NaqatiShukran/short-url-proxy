import { OnModuleInit } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { Client } from '@nestjs/microservices/decorators';
import { IGrpcService } from 'src/grpc.interfaces';
import { microserviceOptions } from '../../../grpc.options';

import { UrlService } from '../../proxyUrl.service';
import { GetUrlQuery } from '../query/get-url.queries';


@QueryHandler(GetUrlQuery)
export class GetUrlHandler implements IQueryHandler<GetUrlQuery>, OnModuleInit {
    constructor(private readonly repository: UrlService) {}

    @Client(microserviceOptions)
    private client: ClientGrpc;
    private grpcService: IGrpcService;

    onModuleInit(){
        this.grpcService = this.client.getService<IGrpcService>('UrlController')
    }

    async execute(query: GetUrlQuery) {
        console.log('Async GetUrlQuery...');
        const Url = await this.grpcService.getShortUrl({ urlHash: query.urlHash }).toPromise();
        this.repository.updateCount(query)
        return Url.urlOb;
    }
    }
