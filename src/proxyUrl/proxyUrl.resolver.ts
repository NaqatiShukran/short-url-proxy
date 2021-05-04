// import { OnModuleInit, Redirect } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
// import { Client, ClientGrpc } from "@nestjs/microservices";
// import { IGrpcService } from "src/grpc.interfaces";
// import { microserviceOptions } from "src/grpc.options";
import { InsertUrlCommand } from "./commands/command/insert-url.command";
import { GetUrlArgs } from "./dto/args/get-url.args";
import { InsertUrlInput } from "./dto/input/insert-url.input";
import { UrlCountGraph, UrlGraph } from "./model/url";
// import { UrlService } from "./proxyUrl.service";
import { GetUrlCountQuery } from "./queries/query/get-url-count.queries";
import { GetUrlQuery } from "./queries/query/get-url.queries";

@Resolver()
export class UrlResolver {
    constructor(private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,) {}

    // @Client(microserviceOptions)
    // private client: ClientGrpc;
    // private grpcService: IGrpcService;

    // onModuleInit(){
    //     this.grpcService = this.client.getService<IGrpcService>('UrlController')
    // }

    @Query(() => UrlCountGraph)
    async getUrlCount(@Args() getUrlArgs: GetUrlArgs): Promise<UrlCountGraph> {
        // const Url = await this.grpcService.getShortUrl({ urlHash: getUrlArgs.urlHash }).toPromise();
        // const Count = await this.urlService.getCount(getUrlArgs);             
        // return {
        //     urlName: Url.urlOb.url,
        //     urlCount: Count
        // }
        return this.queryBus.execute(new GetUrlCountQuery(getUrlArgs.urlHash));
    }

    @Query(() => UrlGraph)
    async getUrl(@Args() getUrlArgs: GetUrlArgs): Promise<UrlGraph> {
        // const Url = await this.grpcService.getShortUrl({ urlHash: getUrlArgs.urlHash }).toPromise();
        // this.urlService.updateCount(getUrlArgs); 
        // return Url.urlOb
        return this.queryBus.execute(new GetUrlQuery(getUrlArgs.urlHash));
    }

    @Mutation(() => UrlGraph)
    async insertUrl(@Args('insertUrlData') insertUrlData: InsertUrlInput): Promise<UrlGraph> {
        // const Url = await this.grpcService.insertUrl({originalUrl: insertUrlData.originalUrl}).toPromise();
        // return Url.urlOb
        return this.commandBus.execute(new InsertUrlCommand(insertUrlData.originalUrl))
    }

}