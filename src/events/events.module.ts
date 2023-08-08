import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { ClickEvent, ClickEventSchema } from './schemas/click-event.schema';
import { SignupEvent, SignupEventSchema } from './schemas/signup-event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
        discriminators: [
          { name: ClickEvent.name, schema: ClickEventSchema },
          { name: SignupEvent.name, schema: SignupEventSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class EventsModule {}
