import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner, OwnerDocument } from './schemas/owner.schema';
import { CreateOwnerDto } from './create-owner.dto';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel(Owner.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION)
    private ownerModel: Model<Owner>,
  ) {}

  findAll(): Promise<OwnerDocument[]> {
    return this.ownerModel.find().exec();
  }

  findById(id: string): Promise<OwnerDocument> {
    return this.ownerModel.findById(id).exec();
  }

  create(createOwnerDto: CreateOwnerDto): Promise<OwnerDocument> {
    return this.ownerModel.create(createOwnerDto);
  }

  remove(id: string): Promise<OwnerDocument> {
    return this.ownerModel.findByIdAndDelete(id).exec();
  }
}
