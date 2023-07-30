import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

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
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);

export type OwnerDocument = HydratedDocument<Owner>;
