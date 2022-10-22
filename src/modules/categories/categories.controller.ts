import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { QueryValidationPipe } from 'src/pipes/query.validation.pipe';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesService.create(createCategoryDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async findAll(@Query(QueryValidationPipe) query: any) {
    try {
      return await this.categoriesService.findAll(query);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.categoriesService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(':id')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoriesService.update(id, updateCategoryDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.categoriesService.remove(id);

      return { message: 'Deleted Successfully', id };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
