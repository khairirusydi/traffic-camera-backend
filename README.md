# Traffic Camera Backend

![Swagger screenshot](/docs/swagger-screenshot.png)

## Description

Backend app utilising [open source data from Data.gov](https://guide.data.gov.sg/developer-guide/api-overview) to retrieve traffic camera and weather forecast data.

## Prerequisites

In order the make run the project locally, please ensure that:

- [podman-compose](https://github.com/containers/podman-compose) is installed on your machine
- `node` is installed on your machine

`Docker`can still be used instead of `podman-compose` but requires updating the db scripts to use `docker-compose` instead.

## Installation

```bash
$ npm install
```

## Running The App

1. Rename the `sample.env.local` file to `.env.local`.

2. Run the following script to run the prisma migration and start the app

```bash
# watch mode in development
$ npm run start:dev
```

The Swagger UI can be accessed at [http://localhost:3000/api](http://localhost:3000/api).

## Asumptions

The following assumptions were made while building the app:

- 5b: Create an api to retrieve the top 10 date time + location searched within a period.
  - assumes 10 most recent searches in a given date range

## Possible Enhancements

- use custom validation pipe to validate`startDateTime` and `endDateTime` query param values in `fetchTopQueriesByPeriod` service
  - eg. values are before year 2999
  - `endDateTime` is before `startDateTime`
- use an actual reverse geocoding service eg. OneMap instead of API 2 (2-hour weather forecast) to prevent having to calculate the nearest location for each camera
  - with current implementation `toTrafficCamerasWithForecast` mapper has to call `getNearestArea` on each camera a util function to calculate which coordinate it is closest to
- clarify on requirements instead of making assumptions eg. implementation of 5b.
- Add more tests
