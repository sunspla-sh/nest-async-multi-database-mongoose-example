import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClickEvent } from './schemas/click-event.schema';
import { SignupEvent } from './schemas/signup-event.schema';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(ClickEvent.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION)
    private clickEventModel: Model<ClickEvent>,
    @InjectModel(SignupEvent.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION)
    private signupEventModel: Model<SignupEvent>,
  ) {}

  createRandomEvent() {
    if (Math.random() < 0.5) {
      return this.clickEventModel.create({
        time: Date.now(),
        url: 'https://google.com',
      });
    }
    return this.signupEventModel.create({
      time: Date.now(),
      user: 'random user',
    });
  }
}
