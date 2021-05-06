import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { InsertUrlEvent } from '../event/insert-url.event';


@EventsHandler(InsertUrlEvent)
export class InsertUrlEventHandler implements IEventHandler<InsertUrlEvent> {
    handle(event: InsertUrlEvent) {
    console.log('InsertUrlEvent...');
    }
}