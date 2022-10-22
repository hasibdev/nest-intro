import { IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Name is required!' })
  name: string;
  description: string;
  products: string[];
}
