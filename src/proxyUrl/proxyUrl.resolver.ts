import { OnModuleInit, Redirect } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Client, ClientGrpc } from "@nestjs/microservices";
import { IGrpcService } from "src/grpc.interfaces";
import { microserviceOptions } from "src/grpc.options";
import { GetUrlArgs } from "./dto/args/get-url.args";
import { InsertUrlInput } from "./dto/input/insert-url.input";
import { UrlCountGraph, UrlGraph } from "./model/url";
import { UrlService } from "./proxyUrl.service";

@Resolver()
export class UrlResolver implements OnModuleInit{
    constructor(private readonly urlService: UrlService) {}

    @Client(microserviceOptions)
    private client: ClientGrpc;
    private grpcService: IGrpcService;

    onModuleInit(){
        this.grpcService = this.client.getService<IGrpcService>('UrlController')
      }

    @Query(() => UrlCountGraph)
    async getUrlCount(@Args() getUrlArgs: GetUrlArgs): Promise<UrlCountGraph> {
        const Url = await this.grpcService.getShortUrl({ urlHash: getUrlArgs.urlHash }).toPromise();
        const Count = await this.urlService.getCount(getUrlArgs);             
        return {
            urlName: Url.urlOb.url,
            urlCount: Count
        }
    }

    @Query(() => UrlGraph)
    async getUrl(@Args() getUrlArgs: GetUrlArgs): Promise<UrlGraph> {
        const Url = await this.grpcService.getShortUrl({ urlHash: getUrlArgs.urlHash }).toPromise();
        this.urlService.updateCount(getUrlArgs); 
        return Url.urlOb
    }

    @Mutation(() => UrlGraph)
    async insertUrl(@Args('insertUrlData') insertUrlData: InsertUrlInput): Promise<UrlGraph> {
        const Url = await this.grpcService.insertUrl({originalUrl: insertUrlData.originalUrl}).toPromise();
        return Url.urlOb
    }

}