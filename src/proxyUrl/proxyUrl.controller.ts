// import { Controller, Get, Query , Param, Redirect, OnModuleInit, Logger} from "@nestjs/common";
// import { UrlService } from "./proxyUrl.service";
// import { Client, ClientGrpc } from '@nestjs/microservices';
// import { IGrpcService } from '../grpc.interfaces';
// import { microserviceOptions } from '../grpc.options';

// @Controller('url')
// export class UrlController implements OnModuleInit{
//     constructor(private readonly UrlService: UrlService) {}

//     private logger = new Logger('UrlController');

//     @Client(microserviceOptions)
//     private client: ClientGrpc;
//     private grpcService: IGrpcService;

//     onModuleInit(){
//         this.grpcService = this.client.getService<IGrpcService>('UrlController')
//       }

//     @Get()
//     async getUrlCount(@Query('hash') hash ) {
//         // console.log('Hash is' + hash);
//         try{
//             const Url = await this.grpcService.getShortUrl({ urlHash: hash }).toPromise();
//             // console.log(Url.urlOb);
//             // console.log(typeof(Url.urlOb));
//             let hitCount = await this.UrlService.getCount(hash)
//             // console.log(hitCount);
//              return {url:Url.urlOb.url,urlHitCount: hitCount}
//         }
//         catch(error){};

//     }

    
//     @Get(":hash")
//     @Redirect('http://pagenotfound.com/',302)
//     async updateUrlCount(@Param('hash') hash: string){
//         try{
//             const Url = await this.grpcService.getShortUrl({ urlHash: hash }).toPromise();
//             // console.log(" +URl is", {url: Url.url});
//             this.UrlService.updateCount(hash)
//             return { url:Url.url }
//             }
//             catch(error){};
//     }

// }