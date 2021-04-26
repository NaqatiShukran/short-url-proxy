import { Injectable, NotFoundException, Inject, Catch } from "@nestjs/common";
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { GetUrlArgs } from "./dto/args/get-url.args";
import { UrlCountGraph } from "./model/url";
import { UrlCount } from "./proxyUrl.model";

@Injectable()
export class UrlService{


  constructor(@InjectModel('UrlCount') private readonly urlCount: Model<UrlCount>){}

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


}
