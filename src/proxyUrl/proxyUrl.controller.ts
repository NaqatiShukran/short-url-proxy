import { Controller, Get, Query , Param, Redirect} from "@nestjs/common";
import { UrlService } from "./proxyUrl.service";

@Controller('url')
export class UrlController {
    constructor(private readonly UrlService: UrlService) {}

    // BasePath = 'http://localhost:3000/'

    // @Get()
    // async getAllShortUrl() {
    //     const Urls = await this.UrlService.getUrls();
    //     return Urls
    // }

    @Get()
    async getUrlCount(@Query('hash') hash ) {
        console.log('Hash is' + hash);
        try{
        const Url = await this.UrlService.getUrlCount(hash);
        return Url;
        }
        catch(error){
            return {
                message: error.message
            }
        };

    }

    
    @Get(":hash")
    @Redirect('http://pagenotfound.com/',302)
    async updateUrlCount(@Param('hash') hash: string){
        try{
            const Url = await this.UrlService.updateUrlCount(hash);
            // console.log(" +URl is", {url: Url.url});
            return { url:Url.url }
            }
            catch(error){
                return {
                    message: error.message
                }
            };
    }

}

// @Redirect()
// @Get('/somelocation')
// index() {
//   const url = this.getNewLocation();
//   return { statusCode: HttpStatus.FOUND, url };
// }