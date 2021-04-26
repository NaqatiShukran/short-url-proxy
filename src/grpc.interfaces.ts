import { Observable } from 'rxjs'

export interface IGrpcService{
    getShortUrl(urlHash: IUrlHash) : Observable<any>;
    insertUrl(originalUrl: IOriginalUrl): Observable<any>;
}

interface IUrlHash{
    urlHash: string;
}

interface IOriginalUrl{
    originalUrl : string
}