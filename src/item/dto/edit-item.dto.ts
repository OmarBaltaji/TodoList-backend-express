/* eslint-disable prettier/prettier */
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class EditItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @IsString()
  @IsOptional()
  listId?: string;
}
