import { IsOptional } from 'class-validator';

export class UpdateProductCategoryDto {
  @IsOptional()
  name: string;
}
