import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UrlService } from 'src/proxyUrl/proxyUrl.service';
import { UpdateUrlEvent } from '../event/update-url.event';



@EventsHandler(UpdateUrlEvent)
export class UpdateUrlHandler implements IEventHandler<UpdateUrlEvent> {
    constructor(
        private readonly repository: UrlService,
        ) {}
    handle(event: UpdateUrlEvent) {
    console.log('UpdateUrlEvent...');
    const insertedEvent = this.repository.insertUrlEventInDb(event.url, event.urlHash);
    console.log("Inserted event is", insertedEvent);
    }
}