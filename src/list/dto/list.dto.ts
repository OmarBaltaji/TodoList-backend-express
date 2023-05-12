/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class ListDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
