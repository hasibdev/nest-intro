import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/modules/products/schemas/product.schema';

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product' })
  products: Product[];
}

export type CategoryDocument = Category & Document;

export const categorySchema = SchemaFactory.createForClass(Category);
