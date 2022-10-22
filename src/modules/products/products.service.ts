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
    try {
      const data = await this.productModel.create({ ...createProductDto });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll() {
    try {
      const data = await this.productModel.find();
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.productModel.findById(id).populate('category');
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const data = await this.productModel.findByIdAndUpdate(
        id,
        { ...updateProductDto, updated_at: new Date() },
        { new: true },
      );

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async remove(id: string) {
    try {
      await this.productModel.findByIdAndDelete(id);
      return Promise.resolve(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
