/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class ListDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;
}
