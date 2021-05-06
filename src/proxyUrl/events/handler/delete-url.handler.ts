import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { DeleteUrlEvent } from '../event/delete-url.event';



@EventsHandler(DeleteUrlEvent)
export class DeleteUrlEventHandler implements IEventHandler<DeleteUrlEvent> {
    handle(event: DeleteUrlEvent) {
    console.log('DeleteUrlEvent...');
    }
}