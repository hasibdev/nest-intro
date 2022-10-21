import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export type CategoryDocument = Category & Document;

export const categorySchema = SchemaFactory.createForClass(Category);
