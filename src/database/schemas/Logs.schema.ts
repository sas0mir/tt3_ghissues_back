import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Actions } from './Actions.schema';

@Schema()
export class Logs extends Document {
  @Prop({ unique: true, required: true })
  userIp: string;

  @Prop({ required: false, type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, res: 'Actions', required: true })
  type: Actions;

  @Prop({ required: false })
  success?: boolean;
}

export const LogsSchema = SchemaFactory.createForClass(Logs);
