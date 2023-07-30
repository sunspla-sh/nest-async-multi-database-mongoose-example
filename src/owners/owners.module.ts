import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { Owner, OwnerSchema } from './schemas/owner.schema';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Owner.name, schema: OwnerSchema }],
      NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
    ),
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
