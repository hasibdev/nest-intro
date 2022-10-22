import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryType } from 'src/pipes/query.validation.pipe';
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

  async findAll(query: QueryType) {
    const { page, limit, sort, search } = query;
    let options = {};
    if (search) {
      options = {
        ...options,
        $or: [
          { name: new RegExp(search.toString(), 'i') },
          { price: /^\d+$/.test(search) ? Number(search) : null },
        ],
      };
    }

    try {
      const data = await this.productModel
        .find(options)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ created_at: sort })
        .exec();

      const count = await this.productModel.countDocuments();
      const total_page = Math.ceil(count / limit);
      const previous_page = page == 1 ? null : page - 1;
      const next_page = page == total_page ? null : page + 1;
      const pagination = {
        count,
        limit,
        total_page,
        current_page: page,
        next_page,
        previous_page,
      };
      return Promise.resolve({ pagination, data });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.productModel
        .findOne({ _id: id })
        .populate('category');
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const data = await this.productModel.findOneAndUpdate(
        { _id: id },
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
      await this.productModel.findOneAndRemove({ _id: id });
      return Promise.resolve(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
