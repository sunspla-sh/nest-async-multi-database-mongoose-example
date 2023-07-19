import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Cat } from '../../cats/schemas/cat.schema';

@Schema()
export class Owner {
  @Prop({
    required: true,
    minlength: 1,
    maxlength: 64,
  })
  firstName: string;

  @Prop({
    required: true,
    minlength: 1,
    maxlength: 64,
  })
  lastName: string;

  @Prop([{ type: Types.ObjectId, ref: Cat.name }])
  cats: Cat[];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);

export type OwnerDocument = HydratedDocument<Owner>;
