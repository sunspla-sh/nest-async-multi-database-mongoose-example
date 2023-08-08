import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class SignupEvent {
  kind: string;
  time: Date;

  @Prop({ type: String, required: true })
  user: string;
}

export const SignupEventSchema = SchemaFactory.createForClass(SignupEvent);

export type SignupDocument = HydratedDocument<SignupEvent>;
