import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model, isObjectIdOrHexString } from 'mongoose';
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

    const resOneCat = await request(server).get('/cats');
    expect(resOneCat.statusCode).toBe(200);
    expect(resOneCat.body).toEqual(expectedResponseBody);

    await catModel.findByIdAndDelete(createdCat.id);
    await ownerModel.findByIdAndDelete(createdOwner.id);
  });

  it('GET /cats/:id', async () => {
    const server = app.getHttpServer();
    const resBadRequest = await request(server).get('/cats/hi');
    expect(resBadRequest.statusCode).toBe(400);
    expect(resBadRequest.body.error).toBe('Bad Request');

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

    const expectedResponseBody = {
      ...JSON.parse(JSON.stringify(createdCat.toJSON())),
      owner: {
        ...JSON.parse(JSON.stringify(createdOwner.toJSON())),
      },
    };

    const resCatById = await request(server).get(`/cats/${createdCat.id}`);
    expect(resCatById.statusCode).toBe(200);
    expect(resCatById.body).toEqual(expectedResponseBody);

    await catModel.findByIdAndDelete(createdCat.id);
    await ownerModel.findByIdAndDelete(createdOwner.id);
  });

  it('POST /cats', async () => {
    const server = app.getHttpServer();
    const resBadRequest = await request(server)
      .post('/cats')
      .send({ someData: 'notACat' });
    expect(resBadRequest.statusCode).toBe(400);
    expect(resBadRequest.body.error).toBe('Bad Request');

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

    const resCreateCat = await request(server).post('/cats').send(testCat);
    expect(resCreateCat.statusCode).toBe(201);
    //Expect a body with all of the existing cat properties, plus a populated owner object (not a model - which is why we convert it to JSON and back)
    expect(resCreateCat.body).toEqual(
      expect.objectContaining({
        ...testCat,
        owner: JSON.parse(JSON.stringify(createdOwner.toJSON())),
      }),
    );
    expect(isObjectIdOrHexString(resCreateCat.body._id)).toBe(true); //expect a new _id for the cat

    await catModel.findByIdAndDelete(resCreateCat.body._id); //normally the ObjectIds returned from mongodb are on a _id property
    await ownerModel.findByIdAndDelete(createdOwner.id); //we can use id instead of _id here because in mongoose models, id maps to _id
  });

  it('POST /cats/multiple', async () => {
    const server = app.getHttpServer();
    const resBadRequest = await request(app)
      .post('/cats/multiple')
      .send({
        action: [
          { someData: 'not a cat' },
          { moreData: 'also not a cat', random: 1234 },
        ],
      });

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
  });

  // it('DELETE /cats/:id', () => {});

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await mongod.stop();
  });
});
