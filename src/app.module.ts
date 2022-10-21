import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongoURI = 'mongodb://localhost:27017/testdb';

@Module({
  imports: [MongooseModule.forRoot(mongoURI), ProductsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
