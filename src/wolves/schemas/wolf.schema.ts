import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { Owner } from '../../owners/schemas/owner.schema';

@Schema()
export class Wolf {
  @Prop({
    type: String,
    minlength: 1,
    maxlength: 64,
    required: true,
  })
  type: string;

  @Prop({
    type: Types.ObjectId,
    ref: Owner.name,
    required: true,
  })
  owner: Owner;
}

export const WolfSchema = SchemaFactory.createForClass(Wolf);

export type WolfDocument = HydratedDocument<Wolf>;
