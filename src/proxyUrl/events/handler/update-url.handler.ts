import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UpdateUrlEvent } from '../event/update-url.event';



@EventsHandler(UpdateUrlEvent)
export class UpdateUrlHandler implements IEventHandler<UpdateUrlEvent> {
    handle(event: UpdateUrlEvent) {
    console.log('UpdateUrlEvent...');
    }
}