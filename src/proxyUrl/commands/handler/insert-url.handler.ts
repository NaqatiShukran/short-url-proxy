import { OnModuleInit } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { IGrpcService } from 'src/grpc.interfaces';
import { microserviceOptions } from 'src/grpc.options';
import { UrlModel } from 'src/proxyUrl/model/url.model';
import { UrlService } from 'src/proxyUrl/proxyUrl.service';
import { InsertUrlCommand } from '../command/insert-url.command';


@CommandHandler(InsertUrlCommand)
export class InsertUrlHandler implements ICommandHandler<InsertUrlCommand> {
    constructor(
        private readonly repository: UrlService,
        private readonly publisher: StoreEventPublisher
        ) {}

    // @Client(microserviceOptions)
    // private client: ClientGrpc;
    // private grpcService: IGrpcService;

    // onModuleInit(){
    //     this.grpcService = this.client.getService<IGrpcService>('UrlController')
    // }

    async execute(command: InsertUrlCommand) {
        console.log('InsertUrlCommand...');
        
        const url = this.publisher.mergeObjectContext(
            await this.repository.insertUrlInDb(command.originalUrl)
        );
        console.log(url);
        url.updateUrl();
        url.commit();
        return url
        
    }
}
