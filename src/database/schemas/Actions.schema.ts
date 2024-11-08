import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//1 search_user, 2 search_repository, 3 search_issues, 4 get_issues, 5 get_issue

@Schema()
export class Actions extends Document {
  @Prop({ unique: true, required: true })
  id: number;

  @Prop({ required: false, type: Date })
  createdAt?: Date;

  @Prop({ required: false, type: Date })
  deletedAt?: Date;

  @Prop({ required: false })
  name: string;
}

export const ActionsSchema = SchemaFactory.createForClass(Actions);
