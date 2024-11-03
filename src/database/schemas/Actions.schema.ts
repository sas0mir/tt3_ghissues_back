import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

//1 search_user, 2 search_repository, 3 search_issues, 4 get_issues, 5 get_issue

@Schema()
export class Actions extends Document {
  @Prop({ unique: true, required: true })
  id: number;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  deletedAt?: Date;

  @Prop({ required: false })
  name: string;
}

export const ActionsSchema = SchemaFactory.createForClass(Actions);
