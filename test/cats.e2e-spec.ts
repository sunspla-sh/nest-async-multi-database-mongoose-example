import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CatsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {

    const mongod = await MongoMemoryServer.create();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('GET /cats', () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect([]);
  });

  it('GET /cats/:id', () => {});

  it('POST /cats', () => {});

  it('POST /cats/multiple', () => {});

  it('DELETE /cats/:id', () => {});
});
