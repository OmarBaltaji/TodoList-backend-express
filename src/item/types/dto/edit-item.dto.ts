/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class EditItemDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  listId?: string;
}
