import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/modules/categories/schemas/category.schema';

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  })
  category: Category;

  @Prop({ default: () => Date.now(), immutable: true })
  created_at: Date;

  @Prop({ default: () => Date.now() })
  updated_at: Date;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
