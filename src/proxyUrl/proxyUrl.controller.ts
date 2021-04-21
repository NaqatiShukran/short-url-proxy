import { Controller, Get, Query , Param, Redirect, OnModuleInit, Logger} from "@nestjs/common";
import { UrlService } from "./proxyUrl.service";
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IGrpcService } from '../grpc.interfaces';
import { microserviceOptions } from '../grpc.options';

@Controller('url')
export class UrlController implements OnModuleInit{
    constructor(private readonly UrlService: UrlService) {}

    private logger = new Logger('UrlController');

    @Client(microserviceOptions)
    private client: ClientGrpc;
    private grpcService: IGrpcService;

    onModuleInit(){
        this.grpcService = this.client.getService<IGrpcService>('UrlController')
      }

    @Get()
    async getUrlCount(@Query('hash') hash ) {
        console.log('Hash is' + hash);
        try{
            let Url = await this.grpcService.getShortUrl({ urlHash: hash }).toPromise();
            // console.log(Url.url);
            // let url1 = eval(Url.url);
            // console.log(url1)
            // Url = await this.UrlService.getJsonData(Url.url);
            // console.log("log in controller", typeof(url1));
            let hitCount = await this.UrlService.getCount(hash)
            // console.log(hitCount);
             return {url:Url.url,urlHitCount: hitCount}
        }
        catch(error){
        };

    }

    
    // @Get(":hash")
    // @Redirect('http://pagenotfound.com/',302)
    // async updateUrlCount(@Param('hash') hash: string){
    //     try{
    //         const Url = await this.UrlService.updateUrlCount(hash);
    //         // console.log(" +URl is", {url: Url.url});
    //         return { url:Url.url }
    //         }
    //         catch(error){
    //             return {
    //                 message: error.message
    //             }
    //         };
    // }

}