import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import TrafficController from './traffic.controller';
import {
  AreaMetadataAndForecast,
  GetTrafficCamerasResponse,
} from './traffic.dto';
import TrafficService from './traffic.service';

describe('TrafficController', () => {
  let trafficController: TrafficController;
  let httpService: DeepMocked<HttpService>;

  const mockGetForecastApiResponse = {
    data: {
      api_info: {
        status: 'healthy',
      },
      area_metadata: [
        {
          name: 'Ang Mo Kio',
          label_location: {
            latitude: 1.375,
            longitude: 103.839,
          },
        },
        {
          name: 'Bedok',
          label_location: {
            latitude: 1.321,
            longitude: 103.924,
          },
        },
      ],
      items: [
        {
          update_timestamp: new Date('2024-03-20T16:25:35+08:00'),
          timestamp: new Date('2024-03-20T16:21:00+08:00'),
          valid_period: {
            start: new Date('2024-03-20T16:00:00+08:00'),
            end: new Date('2024-03-20T18:00:00+08:00'),
          },
          forecasts: [
            {
              area: 'Ang Mo Kio',
              forecast: 'Cloudy',
            },
            {
              area: 'Bedok',
              forecast: 'Partly Cloudy (Day)',
            },
          ],
        },
      ],
    },
    headers: {},
    config: { url: '' },
    status: 200,
    statusText: '',
  };

  const mockGetTrafficImagesApiResponse = {
    data: {
      api_info: {
        status: 'healthy',
      },
      items: [
        {
          timestamp: new Date('2024-03-24T11:38:51+08:00'),
          cameras: [
            {
              timestamp: new Date('2024-03-24T11:38:51+08:00'),
              image:
                'https://images.data.gov.sg/api/traffic-images/2024/03/efd876c9-58ad-4984-9eb2-7aa1663d4cef.jpg',
              location: {
                latitude: 1.29531332,
                longitude: 103.871146,
              },
              camera_id: '1001',
              image_metadata: {
                height: 240,
                width: 320,
                md5: '9d5e3e53ab1bbb1ab97758436bd7da76',
              },
            },
          ],
        },
      ],
    },
    headers: {},
    config: { url: '' },
    status: 200,
    statusText: '',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrafficController],
      providers: [
        TrafficService,
        {
          provide: CACHE_MANAGER,
          useValue: { get: jest.fn(), set: jest.fn() },
        },
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
      ],
    }).compile();

    trafficController = app.get<TrafficController>(TrafficController);
    httpService = app.get(HttpService);
  });

  it('should be defined', () => {
    expect(trafficController).toBeDefined();
  });

  describe('getAreaMetadataAndForecast', () => {
    it('should return return the area metadata mapping and weather forecast', () => {
      httpService.axiosRef.get = jest
        .fn()
        .mockResolvedValueOnce(mockGetForecastApiResponse);

      const expected: AreaMetadataAndForecast = {
        locations: [
          {
            name: 'Ang Mo Kio',
            location: { latitude: 1.375, longitude: 103.839 },
            forecast: 'Cloudy',
          },
          {
            name: 'Bedok',
            location: { latitude: 1.321, longitude: 103.924 },
            forecast: 'Partly Cloudy (Day)',
          },
        ],
      };
      const actual = trafficController.getAreaMetadataAndForecast();

      expect(actual).resolves.toEqual(expected);
    });

    it('should throw an error if external API is returns error', () => {
      httpService.axiosRef.get = jest.fn().mockResolvedValueOnce({
        data: 'Internal Server Error',
        headers: {},
        config: { url: '' },
        status: 500,
        statusText: '',
      });

      const actual = trafficController.getAreaMetadataAndForecast();

      expect(actual).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('getTrafficImages', () => {
    it('should return return mapped traffic camera list with weather forcast', () => {
      httpService.axiosRef.get = jest
        .fn()
        .mockResolvedValueOnce(mockGetTrafficImagesApiResponse)
        .mockResolvedValueOnce(mockGetForecastApiResponse);

      const expected: GetTrafficCamerasResponse = {
        cameras: [
          {
            timestamp: new Date('2024-03-24T11:38:51+08:00'),
            image:
              'https://images.data.gov.sg/api/traffic-images/2024/03/efd876c9-58ad-4984-9eb2-7aa1663d4cef.jpg',
            location: {
              latitude: 1.29531332,
              longitude: 103.871146,
            },
            cameraId: '1001',
            imageMetadata: {
              height: 240,
              width: 320,
              md5: '9d5e3e53ab1bbb1ab97758436bd7da76',
            },
            name: 'Bedok 1',
            forecast: 'Partly Cloudy (Day)',
          },
        ],
      };
      const actual = trafficController.getTrafficImages();

      expect(actual).resolves.toEqual(expected);
    });

    it('should throw an error if external API is returns error', () => {
      httpService.axiosRef.get = jest.fn().mockResolvedValueOnce({
        data: 'Internal Server Error',
        headers: {},
        config: { url: '' },
        status: 500,
        statusText: '',
      });

      const actual = trafficController.getTrafficImages();

      expect(actual).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
