import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/modules/categories/schemas/category.schema';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;
}

export type ProductDocument = Product & Document;

export const productSchema = SchemaFactory.createForClass(Product);
