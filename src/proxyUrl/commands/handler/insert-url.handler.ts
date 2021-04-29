import { OnModuleInit } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IGrpcService } from 'src/grpc.interfaces';
import { microserviceOptions } from 'src/grpc.options';
import { UrlModel } from 'src/proxyUrl/model/url.model';
import { UrlService } from 'src/proxyUrl/proxyUrl.service';
import { InsertUrlCommand } from '../command/insert-url.command';


@CommandHandler(InsertUrlCommand)
export class InsertUrlHandler implements ICommandHandler<InsertUrlCommand> {
    constructor(
        private readonly repository: UrlService,
        private readonly publisher: EventPublisher
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
        url.insertUrl();
        url.commit();
        return url
        
    }
}
