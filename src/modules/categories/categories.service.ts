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

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create({ ...createCategoryDto });
  }

  findAll() {
    return this.categoryModel.find().exec();
  }

  findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(
      id,
      { ...updateCategoryDto },
      { new: true },
    );
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
