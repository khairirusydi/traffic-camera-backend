import { Test, TestingModule } from '@nestjs/testing';

import TrafficController from './traffic.controller';
import TrafficService from './traffic.service';

describe('AppController', () => {
  let trafficController: TrafficController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrafficController],
      providers: [TrafficService],
    }).compile();

    trafficController = app.get<TrafficController>(TrafficController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(trafficController.getAreaMetadataAndForecast()).toBe(
        'Hello World!',
      );
    });
  });
});
