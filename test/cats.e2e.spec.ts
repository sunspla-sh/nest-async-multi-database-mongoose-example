import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Owner } from '../src/owners/schemas/owner.schema';
import { Cat } from '../src/cats/schemas/cat.schema';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../src/constants';

import * as request from 'supertest';
// import { AppModule } from '../src/app.module'; //don't require app module up here because env validation runs upon import

describe('CatsController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let catModel: Model<Cat>;
  let ownerModel: Model<Owner>;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const ownersAndCatsDbURI = uri + 'nest-multidb-owners-and-cats';
    process.env.OWNERS_AND_CATS_DB = ownersAndCatsDbURI;
    const wolvesDbURI = uri + 'nest-multidb-wolves';
    process.env.WOLVES_DB = wolvesDbURI;

    /**
     * Require app module here because validation occurs upon import and
     * we need to set the env variables first
     */
    const { AppModule } = jest.requireActual('../src/app.module');
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    catModel = moduleRef.get<Model<Cat>>(
      getModelToken(Cat.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION),
    );

    ownerModel = moduleRef.get<Model<Owner>>(
      getModelToken(Owner.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION),
    );

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('GET /cats', async () => {
    const server = app.getHttpServer();

    const resNoCats = await request(server).get('/cats');
    console.log(resNoCats);
    expect(resNoCats.statusCode).toBe(200);
    expect(resNoCats.body).toEqual([]);

    const testOwner: Owner = {
      firstName: 'jim',
      lastName: 'mcgee',
    };
    const createdOwner = await ownerModel.create(testOwner);

    const testCat: Cat = {
      age: 7,
      name: 'bobby the cat',
      owner: createdOwner.id,
    };
    const createdCat = await catModel.create(testCat);

    const expectedResponseBody = [
      {
        ...JSON.parse(JSON.stringify(createdCat.toJSON())),
        owner: {
          ...JSON.parse(JSON.stringify(createdOwner.toJSON())),
        },
      },
    ];
    console.log(expectedResponseBody);

    const resOneCat = await request(server).get('/cats');
    console.log(resOneCat.body);
    expect(resOneCat.statusCode).toBe(200);
    expect(resOneCat.body).toEqual(expectedResponseBody);

  });

  // it('GET /cats/:id', () => {
  //   // request(app.getHttpServer()).get('/cats/hi').expect(200).expect({});
  // });

  // it('POST /cats', () => {});

  // it('POST /cats/multiple', () => {});

  // it('DELETE /cats/:id', () => {});

  afterEach(async () => {
    await app.close();
    await mongod.stop();
  });
});
