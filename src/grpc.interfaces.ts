import { Observable } from 'rxjs'

export interface IGrpcService{
    getShortUrl(urlHash: IUrlHash) : Observable<any>;
}

interface IUrlHash{
    urlHash: string;
}