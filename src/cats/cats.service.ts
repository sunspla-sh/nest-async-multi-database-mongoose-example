import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './schemas/cat.schema';
import { CreateCatDto } from './create-cat.dto';
import { CreateCatArrayDto } from './create-cat-array.dto';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION)
    private catModel: Model<Cat>,
  ) {}

  findAll() {
    return this.catModel.find().exec();
  }

  findById(id: string) {
    return this.catModel.findById(id).exec();
  }

  create(createCatDto: CreateCatDto) {
    /**
     * Transaction here
     */
    return this.catModel.create();
  }

  createMultiple(createCatArrayDto: CreateCatArrayDto) {
    /**
     * Transaction here
     */
    return this.catModel.create();
  }

  remove(id: string) {
    return this.catModel.findByIdAndDelete(id).exec();
  }
}
