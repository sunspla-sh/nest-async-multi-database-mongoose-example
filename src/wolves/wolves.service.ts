import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wolf, WolfDocument } from './schemas/wolf.schema';
import { CreateWolfDto } from './create-wolf.dto';
import { NEST_MULTIDB_WOLVES_CONNECTION } from '../constants';

@Injectable()
export class WolvesService {
  constructor(
    @InjectModel(Wolf.name, NEST_MULTIDB_WOLVES_CONNECTION)
    private wolfModel: Model<Wolf>,
  ) {}

  findAll(): Promise<WolfDocument[]> {
    return this.wolfModel.find().exec();
  }

  findById(id: string): Promise<WolfDocument> {
    return this.wolfModel.findById(id).exec();
  }

  create(createWolfDto: CreateWolfDto): Promise<WolfDocument> {
    return this.wolfModel.create(createWolfDto);
  }

  remove(id: string): Promise<WolfDocument> {
    return this.wolfModel.findByIdAndDelete(id).exec();
  }
}
