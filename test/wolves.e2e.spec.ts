import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types, isObjectIdOrHexString } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Wolf } from '../src/wolves/schemas/wolf.schema';
import { Owner } from '../src/owners/schemas/owner.schema';
import {
  NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
  NEST_MULTIDB_WOLVES_CONNECTION,
} from '../src/constants';

import * as request from 'supertest';

describe('WolvesController (e2e)', () => {
  let mongod: MongoMemoryServer;
  let app: INestApplication;
  let ownerModel: Model<Owner>;
  let wolfModel: Model<Wolf>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
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
    const server = app.getHttpServer();

    const testOwner: Owner = {
      firstName: 'jimbo',
      lastName: 'bob',
    };

    const createdOwner = await ownerModel.create(testOwner);

    const firstTestWolf: Wolf = {
      type: 'dire',
      owner: createdOwner.id,
    };

    const firstCreatedWolf = await wolfModel.create(firstTestWolf);

    const resOneWolf = await request(server).get('/wolves');
    expect(resOneWolf.statusCode).toBe(200);
    expect(resOneWolf.body).toEqual(expect.any(Array));
    expect(resOneWolf.body).toContainEqual({
      ...JSON.parse(JSON.stringify(firstCreatedWolf.toJSON())),
      owner: createdOwner.id,
    });

    const secondTestWolf: Wolf = {
      type: 'brown',
      owner: createdOwner.id,
    };

    const secondCreatedWolf = await wolfModel.create(secondTestWolf);

    const resTwoWolves = await request(server).get('/wolves');
    expect(resTwoWolves.statusCode).toBe(200);
    expect(resTwoWolves.body).toEqual(expect.any(Array));
    expect(resTwoWolves.body).toContainEqual({
      ...JSON.parse(JSON.stringify(firstCreatedWolf.toJSON())),
      owner: createdOwner.id,
    });
    expect(resTwoWolves.body).toContainEqual({
      ...JSON.parse(JSON.stringify(secondCreatedWolf.toJSON())),
      owner: createdOwner.id,
    });

    await wolfModel.findByIdAndDelete(firstCreatedWolf.id);
    await wolfModel.findByIdAndDelete(secondCreatedWolf.id);
    await ownerModel.findByIdAndDelete(createdOwner.id);
  });

  it('GET /wolves/:id', async () => {
    const server = app.getHttpServer();

    const resBadRequest = await request(server).get('/wolves/someFakeId');
    expect(resBadRequest.statusCode).toBe(400);
    expect(resBadRequest.body.error).toBe('Bad Request');

    const objectIdButNotAssociatedWithAWolf =
      new Types.ObjectId().toHexString();

    const resNotFoundRequest = await request(server).get(
      `/wolves/${objectIdButNotAssociatedWithAWolf}`,
    );
    expect(resNotFoundRequest.statusCode).toBe(200);
    expect(resNotFoundRequest.body).toEqual({});

    const testOwner: Owner = {
      firstName: 'schlomo',
      lastName: 'gonzalez',
    };

    const createdOwner = await ownerModel.create(testOwner);

    const testWolf: Wolf = {
      type: 'european',
      owner: createdOwner.id,
    };

    const createdWolf = await wolfModel.create(testWolf);

    const resFoundWolf = await request(server).get(`/wolves/${createdWolf.id}`);

    expect(resFoundWolf.statusCode).toBe(200);
    expect(resFoundWolf.body).toEqual({
      ...JSON.parse(JSON.stringify(createdWolf.toJSON())),
      owner: JSON.parse(JSON.stringify(createdOwner.toJSON())),
    });

    await wolfModel.findByIdAndDelete(createdWolf.id);
    await ownerModel.findByIdAndDelete(createdOwner.id);
  });

  it('POST /wolves', async () => {
    const server = app.getHttpServer();

    const resBadRequest = await request(server)
      .post('/wolves')
      .send({ junk: 'data' });

    expect(resBadRequest.statusCode).toBe(400);
    expect(resBadRequest.body.error).toBe('Bad Request');

    const testOwner: Owner = {
      firstName: 'bobo',
      lastName: 'jones',
    };

    const createdOwner = await ownerModel.create(testOwner);

    const testWolf: Wolf = {
      type: 'asian',
      owner: createdOwner.id,
    };

    const resCreatedWolf = await request(server).post('/wolves').send(testWolf);

    expect(resCreatedWolf.statusCode).toBe(201);
    expect(resCreatedWolf.body).toMatchObject(testWolf);
    expect(isObjectIdOrHexString(resCreatedWolf.body._id)).toBe(true);

    await ownerModel.findByIdAndDelete(createdOwner.id);
    await wolfModel.findByIdAndDelete(resCreatedWolf.body._id);
  });

  it('DELETE /wolves', async () => {
    const server = app.getHttpServer();

    const resBadRequest = await request(server).delete('/wolves/someFakeId');
    expect(resBadRequest.statusCode).toBe(400);
    expect(resBadRequest.body.error).toBe('Bad Request');

    const someValidObjectIdNotAssociatedWithAWolf =
      new Types.ObjectId().toHexString();

    const resNotFoundRequest = await request(server).delete(
      `/wolves/${someValidObjectIdNotAssociatedWithAWolf}`,
    );
    expect(resNotFoundRequest.statusCode).toBe(200);
    expect(resNotFoundRequest.body).toEqual({});

    const testOwner: Owner = {
      firstName: 'abraham',
      lastName: 'lincoln, vampire slayer',
    };

    const createdOwner = await ownerModel.create(testOwner);

    const testWolf: Wolf = {
      type: 'australian',
      owner: createdOwner.id,
    };

    const createdWolf = await wolfModel.create(testWolf);

    const resDeleted = await request(server).delete(
      `/wolves/${createdWolf.id}`,
    );
    expect(resDeleted.statusCode).toBe(200);
    expect(resDeleted.body).toEqual(
      JSON.parse(JSON.stringify(createdWolf.toJSON())),
    );
  });
});
