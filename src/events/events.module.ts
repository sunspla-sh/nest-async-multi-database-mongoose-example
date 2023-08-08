import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { ClickEvent, ClickEventSchema } from './schemas/click-event.schema';
import { SignupEvent, SignupEventSchema } from './schemas/signup-event.schema';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Event.name,
          schema: EventSchema,
          discriminators: [
            { name: ClickEvent.name, schema: ClickEventSchema },
            { name: SignupEvent.name, schema: SignupEventSchema },
          ],
        },
      ],
      NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
    ),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
