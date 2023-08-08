import { Controller, Post } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  createRandomEvent() {
    return this.eventsService.createRandomEvent();
  }
}
