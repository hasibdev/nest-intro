import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryType } from 'src/pipes/query.validation.pipe';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const data = await this.categoryModel.create({ ...createCategoryDto });
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
          { description: new RegExp(search.toString(), 'i') },
        ],
      };
    }

    try {
      const data = await this.categoryModel
        .find(options)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ created_at: sort })
        .exec();
      return Promise.resolve({ data });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.categoryModel
        .findOne({ _id: id })
        .populate('products')
        .exec();
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const data = await this.categoryModel
        .findOneAndUpdate(
          { _id: id },
          { ...updateCategoryDto, updated_at: new Date() },
          { new: true },
        )
        .exec();

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async remove(id: string) {
    try {
      await this.categoryModel.findOneAndDelete({ _id: id }).exec();
      return Promise.resolve(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
