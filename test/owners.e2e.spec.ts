import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model, isObjectIdOrHexString } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Owner } from '../src/owners/schemas/owner.schema';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../src/constants';

import * as request from 'supertest';

describe('OwnersController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let ownerModel: Model<Owner>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const ownersAndCatsDbURI = uri + 'nest-multidb-owners-and-cats';
    process.env.OWNERS_AND_CATS_DB = ownersAndCatsDbURI;
    const wolvesDbURI = uri + 'nest-multidb-wolves';
    process.env.WOLVES_DB = wolvesDbURI;
  });

  beforeEach(async () => {
    /**
     * Require app module here because validation occurs upon import and
     * we need to set the env variables first
     */
    const { AppModule } = jest.requireActual('../src/app.module');
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    ownerModel = moduleRef.get<Model<Owner>>(
      getModelToken(Owner.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION),
    );

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('GET /owners', async () => {
    return;
  });

  it('GET /owners/:id', async () => {
    return;
  });

  it('POST /owners', async () => {
    return;
  });

  it('DELETE /owners', async () => {
    return;
  });
});
