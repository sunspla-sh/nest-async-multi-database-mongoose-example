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

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  it('GET /owners', async () => {
    const server = app.getHttpServer();

    const testOwner: Owner = {
      firstName: 'bobert',
      lastName: 'the fifth',
    };

    const createdOwner = await ownerModel.create(testOwner);

    const resOneOwner = await request(server).get('/owners');
    expect(resOneOwner.statusCode).toBe(200);
    expect(resOneOwner.body).toContainEqual(
      JSON.parse(JSON.stringify(createdOwner.toJSON())),
    );

    const secondTestOwner: Owner = {
      firstName: 'jimbo',
      lastName: 'the second',
    };

    const secondCreatedOwner = await ownerModel.create(secondTestOwner);
    const resTwoOwners = await request(server).get('/owners');
    expect(resTwoOwners.statusCode).toBe(200);
    expect(resTwoOwners.body).toContainEqual(
      JSON.parse(JSON.stringify(createdOwner.toJSON())),
    );
    expect(resTwoOwners.body).toContainEqual(
      JSON.parse(JSON.stringify(secondCreatedOwner.toJSON())),
    );

    await ownerModel.findByIdAndDelete(createdOwner.id);
    await ownerModel.findByIdAndDelete(secondCreatedOwner.id);
  });

  it('GET /owners/:id', async () => {
    const server = app.getHttpServer();

    const resBadRequest = await request(server).get('/owners/someFakeId');
    expect(resBadRequest.statusCode).toBe(400);
    expect(resBadRequest.body.error).toBe('Bad Request');

    const testOwner: Owner = {
      firstName: 'dude',
      lastName: 'mclovin',
    };

    const createdOwner = await ownerModel.create(testOwner);

    const resOwner = await request(server).get(`/owners/${createdOwner.id}`);
    expect(resOwner.statusCode).toBe(200);
    expect(resOwner.body).toEqual(
      JSON.parse(JSON.stringify(createdOwner.toJSON())),
    );

    await ownerModel.findByIdAndDelete(createdOwner.id);
  });

  it('POST /owners', async () => {
    const server = app.getHttpServer();

    const resBadRequest = await request(server)
      .post('/owners')
      .send({ junk: 'data' });

    expect(resBadRequest.statusCode).toBe(400);
    expect(resBadRequest.body.error).toBe('Bad Request');

    const testOwner: Owner = {
      firstName: 'hola',
      lastName: 'senior',
    };

    const resCreatedOwner = await request(server)
      .post('/owners')
      .send(testOwner);

    expect(resCreatedOwner.statusCode).toBe(201);
    expect(resCreatedOwner.body).toMatchObject(testOwner);
    expect(isObjectIdOrHexString(resCreatedOwner.body._id)).toBe(true);

    await ownerModel.findByIdAndDelete(resCreatedOwner.body._id);
  });

  it('DELETE /owners', async () => {
    const server = app.getHttpServer();

    const resBadRequest = await request(server).delete('/owners/fakeJunkId');
    expect(resBadRequest.statusCode).toBe(400);
    expect(resBadRequest.body.error).toBe('Bad Request');

    const testOwner: Owner = {
      firstName: 'jimethy',
      lastName: 'albert',
    };

    const createdOwner = await ownerModel.create(testOwner);

    const resDeleted = await request(server).delete(
      `/owners/${createdOwner.id}`,
    );

    expect(resDeleted.statusCode).toBe(200);
    expect(resDeleted.body).toEqual(
      JSON.parse(JSON.stringify(createdOwner.toJSON())),
    );
  });
});
