import { TestingModule, Test } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: DeepMocked<EventsService>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
    })
      .useMocker(createMock)
      .compile();

    eventsController = moduleRef.get<EventsController>(EventsController);
    eventsService = moduleRef.get<EventsService, DeepMocked<EventsService>>(
      EventsService,
    );
  });

  it('should be defined', () => {
    expect(eventsController).toBeDefined();
  });

  it('should be an instance of EventsController', () => {
    expect(eventsController).toBeInstanceOf(EventsController);
  });

  describe('createRandomEvent', () => {
    it('should be a method', () => {
      expect(eventsController.createRandomEvent).toEqual(expect.any(Function));
    });

    it('should invoke the createRandomEvent method of an instance of EventsService', () => {
      eventsController.createRandomEvent();
      expect(eventsService.createRandomEvent).toHaveBeenCalled();
    });

    it('should return the result of invoking the createRandomEvent method of an isntance of EventsService', () => {
      expect(eventsService.createRandomEvent).toHaveReturnedWith(
        eventsController.createRandomEvent(),
      );
    });
  });
});
