import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const data = await this.productModel.create({ ...createProductDto });
    return data;
  }

  async findAll() {
    const data = await this.productModel.find();
    return data;
  }

  async findOne(id: string) {
    const data = await this.productModel.findById(id);
    return data;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const data = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    return data;
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
