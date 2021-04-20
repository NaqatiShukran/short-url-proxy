import { Injectable, NotFoundException, Inject, Catch } from "@nestjs/common";
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { count } from "node:console";
import { UrlCount } from "./proxyUrl.model";

@Injectable()
export class UrlService{

    private client: ClientProxy;

  constructor(@InjectModel('UrlCount') private readonly urlCount: Model<UrlCount>){
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 8877
   }
   })
  }



    public async getUrlCount(urlHash: string) {
        let url;
        url = await this.client.send<string, string>('url',urlHash).toPromise();
        if (url == null){
            throw new NotFoundException("Url not found");
        }
        const urlCount = await this.getCount(url.urlHash)
        url.count = urlCount
        return {
            url:url.url,
            urlHitCount: url.count
        };
    }

    public async updateUrlCount(urlHash: string) {
        let url;
        url = await this.client.send<string, string>('url',urlHash).toPromise();
        if (url == null){
            throw new NotFoundException("Url not found");
        }
        await this.updateCount(url.urlHash)
        return url;
    }

    public async getCount(urlHash: string){
        const data = await this.urlCount.findOne({urlHash: urlHash})
        if (data==null){
            throw new NotFoundException("Count not found")
        }
        return data.urlCount;
    }

    public async updateCount(urlHash: string){
        const data = await this.urlCount.findOne({urlHash: urlHash})
        console.log(data);
        
        if (data==null){
            const newCount = new this.urlCount({
                urlHash: urlHash,
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
