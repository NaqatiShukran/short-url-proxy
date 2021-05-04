import { StorableEvent } from "event-sourcing-nestjs";

export class UpdateUrlEvent extends StorableEvent{
    constructor(
        public readonly url: string,
        public readonly urlHash: string,
    ) {
        super()
    }
    eventAggregate = 'Shukran';
    eventVersion = 1;
    id = '_id_';
}