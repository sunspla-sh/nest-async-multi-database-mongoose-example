import { TestingModule, Test } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';
import { EventsService } from './events.service';
import { ClickEvent } from './schemas/click-event.schema';
import { SignupEvent } from './schemas/signup-event.schema';

describe('EventsService', () => {
  let eventsService: EventsService;
  let signupEventModel: DeepMocked<Model<SignupEvent>>;
  let clickEventModel: DeepMocked<Model<ClickEvent>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken(
            ClickEvent.name,
            NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
          ),
          useValue: createMock<Model<ClickEvent>>(),
        },
        {
          provide: getModelToken(
            SignupEvent.name,
            NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
          ),
          useValue: createMock<Model<SignupEvent>>(),
        },
      ],
    }).compile();

    eventsService = moduleRef.get<EventsService>(EventsService);
    signupEventModel = moduleRef.get<
      Model<SignupEvent>,
      DeepMocked<Model<SignupEvent>>
    >(getModelToken(SignupEvent.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION));
    clickEventModel = moduleRef.get<
      Model<ClickEvent>,
      DeepMocked<Model<ClickEvent>>
    >(getModelToken(ClickEvent.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION));
  });

  it('should be defined', () => {
    expect(eventsService).toBeDefined();
  });

  it('should be an instance of EventsService', () => {
    expect(eventsService).toBeInstanceOf(EventsService);
  });

  describe('createRandomEvent', () => {
    it('should be a method', () => {
      expect(eventsService.createRandomEvent).toEqual(expect.any(Function));
    });

    it('should invoke the static create method of signup event model and click event model in a 50/50 split', () => {
      for (let i = 0; i < 100; i++) {
        eventsService.createRandomEvent();
      }
      expect(signupEventModel.create).toHaveBeenCalled();
      expect(signupEventModel.create.mock.calls.length).toBeGreaterThan(25);
      expect(clickEventModel.create.mock.calls.length).toBeGreaterThan(25);
      expect(clickEventModel.create).toHaveBeenCalled();
    });
  });
});
