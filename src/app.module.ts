import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemModule } from './item/item.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ListModule,
    ItemModule,
    MongooseModule.forRoot(process.env.ATLAS_URI),
  ],
})
export class AppModule {}
