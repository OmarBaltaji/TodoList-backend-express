import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AuthResponse')
export class AuthResponseType {
  @Field()
  result: boolean;
}
