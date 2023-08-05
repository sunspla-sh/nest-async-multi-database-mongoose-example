import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WolvesController } from './wolves.controller';
import { WolvesService } from './wolves.service';
import { Wolf, WolfSchema } from './schemas/wolf.schema';
import {
  NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
  NEST_MULTIDB_WOLVES_CONNECTION,
} from '../constants';
import { Owner, OwnerSchema } from '../owners/schemas/owner.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Owner.name, schema: OwnerSchema }],
      NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
    ),
    MongooseModule.forFeature(
      [{ name: Wolf.name, schema: WolfSchema }],
      NEST_MULTIDB_WOLVES_CONNECTION,
    ),
  ],
  controllers: [WolvesController],
  providers: [WolvesService],
})
export class WolvesModule {}
