import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserResponse')
export class UserResponseType {
  @Field()
  access_token: string;
}
