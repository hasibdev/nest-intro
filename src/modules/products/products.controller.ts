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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import {
  QueryType,
  QueryValidationPipe,
} from 'src/pipes/query.validation.pipe';
import { ObjectIdValidationPipe } from 'src/pipes/objectId.validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async findAll(@Query(QueryValidationPipe) query: QueryType) {
    try {
      return await this.productsService.findAll(query);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(':id')
  @Put(':id')
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const data = await this.productsService.update(id, {
        ...updateProductDto,
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ObjectIdValidationPipe) id: string) {
    try {
      await this.productsService.remove(id);
      return { message: 'Deleted Successfully', id };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
