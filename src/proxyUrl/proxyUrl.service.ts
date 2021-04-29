import { Injectable, NotFoundException, Inject, Catch, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport, ClientProxy, Client, ClientGrpc } from '@nestjs/microservices';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { IGrpcService } from "src/grpc.interfaces";
import { microserviceOptions } from "src/grpc.options";
import { GetUrlArgs } from "./dto/args/get-url.args";
import { UrlCountGraph } from "./model/url";
import { UrlModel } from "./model/url.model";
import { UrlCount } from "./proxyUrl.model";

@Injectable()
export class UrlService implements OnModuleInit {
    constructor(
        @InjectModel('UrlCount') private readonly urlCount: Model<UrlCount>
        ) {}

    @Client(microserviceOptions)
    private client: ClientGrpc;
    private grpcService: IGrpcService;

    onModuleInit(){
        this.grpcService = this.client.getService<IGrpcService>('UrlController')
    }


    // constructor(@InjectModel('UrlCount') private readonly urlCount: Model<UrlCount>){}

    public async getCount(getUrlArgs: GetUrlArgs) {
        const data = await this.urlCount.findOne({urlHash: getUrlArgs.urlHash})
        if (data==null){
            throw new NotFoundException("Count not found")
        }
        return data.urlCount;
    }

    public async updateCount(getUrlArgs: GetUrlArgs){
        const data = await this.urlCount.findOne({urlHash: getUrlArgs.urlHash})
        // console.log(data);
        
        if (data==null){
            const newCount = new this.urlCount({
                urlHash: getUrlArgs.urlHash,
                urlCount: 1
            });
            const result = await newCount.save();
            // console.log("Result if not in db" + result.urlCount);
            return result.urlCount;
        }
        data.urlCount = data.urlCount + 1; 
        data.save();
        // console.log("return with inc" + data.urlCount);
        return data.urlCount;
    }

    public async insertUrlInDb(originalUrl: string){
        const Url = await this.grpcService.insertUrl({originalUrl: originalUrl}).toPromise()
        // console.log("in service function", Url.urlOb);
        return new UrlModel(Url.urlOb.id, Url.urlOb.url, Url.urlOb.urlHash, Url.urlOb.shortUrl);
    }


}
