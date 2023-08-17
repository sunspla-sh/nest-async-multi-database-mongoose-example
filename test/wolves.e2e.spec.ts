import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model, isObjectIdOrHexString } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Wolf } from '../src/wolves/schemas/wolf.schema';
import { Owner } from '../src/owners/schemas/owner.schema';
import {
  NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
  NEST_MULTIDB_WOLVES_CONNECTION,
} from '../src/constants';

describe('WolvesController (e2e)', () => {
  let mongod: MongoMemoryServer;
  let app: INestApplication;
  let ownerModel: Model<Owner>;
  let wolfModel: Model<Wolf>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log(uri);
    const ownersAndCatsDbUri = uri + 'nest-multidb-owners-and-cats';
    process.env.OWNERS_AND_CATS_DB = ownersAndCatsDbUri;
    const wolvesDbUri = uri + 'nest-multidb-wolves';
    process.env.WOLVES_DB = wolvesDbUri;
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

    wolfModel = moduleRef.get<Model<Wolf>>(
      getModelToken(Wolf.name, NEST_MULTIDB_WOLVES_CONNECTION),
    );

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  it('GET /wolves', async () => {
    return;
  });

  it('GET /wolves/:id', async () => {
    return;
  });

  it('POST /wolves', async () => {
    return;
  });

  it('DELETE /wolves', async () => {
    return;
  });
});
