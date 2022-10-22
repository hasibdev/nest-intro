import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findAll() {
    try {
      const data = await this.categoryModel.find();
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.categoryModel.findById(id).populate('products');
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const data = await this.categoryModel.findByIdAndUpdate(
        id,
        { ...updateCategoryDto },
        { new: true },
      );
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async remove(id: string) {
    try {
      await this.categoryModel.findByIdAndDelete(id);
      return Promise.resolve(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
