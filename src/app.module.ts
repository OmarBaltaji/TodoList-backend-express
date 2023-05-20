import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { ConfigModule } from '@nestjs/config';
import { ItemModule } from './item/item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './exception-filter/custom-exception.filter';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ListModule,
    ItemModule,
    MongooseModule.forRoot(process.env.ATLAS_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
