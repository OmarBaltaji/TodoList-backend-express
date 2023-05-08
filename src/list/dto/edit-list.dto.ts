/* eslint-disable prettier/prettier */
import { IsString, IsArray, IsOptional } from 'class-validator';

export class EditListDto {
  @IsString()
  @IsOptional()
  title?: string;

  // @IsArray()
  // @IsOptional()
  // item: Item
}
