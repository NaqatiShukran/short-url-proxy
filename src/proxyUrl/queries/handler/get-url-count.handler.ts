import { OnModuleInit } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { Client } from '@nestjs/microservices/decorators';
import { IGrpcService } from 'src/grpc.interfaces';
import { microserviceOptions } from 'src/grpc.options';
import { UrlService } from 'src/proxyUrl/proxyUrl.service';

import { GetUrlCountQuery } from '../query/get-url-count.queries';


@QueryHandler(GetUrlCountQuery)
export class GetUrlCountHandler implements IQueryHandler<GetUrlCountQuery>, OnModuleInit {
    constructor(private readonly repository: UrlService) {}

    @Client(microserviceOptions)
    private client: ClientGrpc;
    private grpcService: IGrpcService;

    onModuleInit(){
        this.grpcService = this.client.getService<IGrpcService>('UrlController')
    }

    async execute(query: GetUrlCountQuery) {
        console.log('Async GetUrlCountQuery...');
        const Count = this.repository.getCount(query);
        const Url = await this.grpcService.getShortUrl({ urlHash: query.urlHash }).toPromise();
        return {
            urlName: Url.urlOb.url,
            urlCount: Count
        }
    }
    }
