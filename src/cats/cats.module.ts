import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Cat.name, schema: CatSchema }],
      NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
    ),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
