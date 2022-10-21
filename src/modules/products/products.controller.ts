import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    try {
      const data = await this.productsService.create(createProductDto);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll(): Promise<Product[]> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const data = await this.productsService.update(id, {
        ...updateProductDto,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.productsService.remove(id);
      return { message: 'Deleted Successfully', id };
    } catch (error) {
      return error;
    }
  }
}
