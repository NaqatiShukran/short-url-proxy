import { AggregateRoot } from '@nestjs/cqrs';
import { DeleteUrlEvent } from '../events/event/delete-url.event';
import { InsertUrlEvent } from '../events/event/insert-url.event';
import { UpdateUrlEvent } from '../events/event/update-url.event';

export class UrlModel extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly url: string,
    private readonly urlHash: string,
    private readonly shortUrl: string,
    
    ) {
    super();
    console.log("url constructor called");
  }

  insertUrl() {
    console.log("Insert Url Event");
    this.apply(new InsertUrlEvent(this.urlHash));
  }

  updateUrl() {
    console.log("Update Url Event");
    this.apply(new UpdateUrlEvent(this.url, this.urlHash));
  }

  deleteUrl(){
    console.log("Delete Url Event");

    this.apply(new DeleteUrlEvent(this.urlHash));
  }
}
