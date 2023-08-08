import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ClickEvent {
  kind: string;
  time: Date;

  @Prop({ type: String, required: true })
  url: string;
}

export const ClickEventSchema = SchemaFactory.createForClass(ClickEvent);

export type ClickEventDocument = HydratedDocument<ClickEvent>;
