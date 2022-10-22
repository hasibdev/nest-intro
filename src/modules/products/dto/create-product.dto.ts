import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required!' })
  name: string;

  @IsNotEmpty({ message: 'Price is required!' })
  price: number;

  category: string;
}
