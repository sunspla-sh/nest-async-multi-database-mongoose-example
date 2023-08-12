import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

import * as request from 'supertest';
// import { AppModule } from '../src/app.module';

describe('CatsController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    process.env.OWNERS_AND_CATS_DB = uri + 'nest-multidb-owners-and-cats';
    process.env.WOLVES_DB = uri + 'nest-multidb-wolves';

    /**
     * Require app module here because validation occurs upon import and
     * we need to set the env variables first
     */
    const { AppModule } = jest.requireActual('../src/app.module');
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('GET /cats', () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect([]);
  });

  // it('GET /cats/:id', () => {});

  // it('POST /cats', () => {});

  // it('POST /cats/multiple', () => {});

  // it('DELETE /cats/:id', () => {});

  afterEach(async () => {
    await app.close();
    await mongod.stop();
  });
});
