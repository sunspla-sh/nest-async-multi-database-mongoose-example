import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './create-cat.dto';
import { CreateCatArrayDto } from './create-cat-array.dto';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION)
    private catModel: Model<Cat>,
    @InjectConnection(NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION)
    private ownersAndCatsConnection: Connection,
  ) {}

  findAll(): Promise<CatDocument[]> {
    return this.catModel.find().exec();
  }

  findById(id: string): Promise<CatDocument> {
    return this.catModel.findById(id).exec();
  }

  create(createCatDto: CreateCatDto): Promise<CatDocument> {
    return this.catModel.create(createCatDto);
  }

  createMultiple(createCatArrayDto: CreateCatArrayDto): Promise<CatDocument[]> {
    // Transactions only allowed on MongoDb with at least 3 replicas or sharded
    // this.ownersAndCatsConnection.transaction(async (session) => {
    //   const cats = createCatArrayDto.action;
    //   await this.catModel.create(cats, { session });
    // });
    const cats = createCatArrayDto.action;
    return this.catModel.create(cats);
  }

  remove(id: string): Promise<CatDocument> {
    return this.catModel.findByIdAndDelete(id).exec();
  }
}
