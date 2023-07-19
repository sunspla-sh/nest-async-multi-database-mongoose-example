import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Owner } from '../../owners/schemas/owner.schema';

@Schema()
export class Cat {
  @Prop({
    required: true,
    minlength: 1,
    maxlength: 64,
  })
  name: string;

  @Prop({
    required: true,
    min: 1,
    max: 32,
  })
  age: number;

  @Prop({ type: Types.ObjectId, ref: Owner.name, required: true })
  owner: Owner;
}

export const CatSchema = SchemaFactory.createForClass(Cat);

export type CatDocument = HydratedDocument<Cat>;
