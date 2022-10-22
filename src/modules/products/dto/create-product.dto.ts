import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required!' })
  name: string;
  price: number;
  category: string;
}
