import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvVariables } from '../validation/env/env.validate';
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
    MongooseModule.forFeatureAsync(
      [
        {
          name: Wolf.name,
          imports: [ConfigModule],
          useFactory: (configService: ConfigService<EnvVariables>) => {
            const wolfSchema = WolfSchema;
            wolfSchema.pre('findOne', function () {
              console.log(
                'here we asynchronously register a findOne/findById pre-hook that takes in a config value from the env: NODE_ENV=' +
                  configService.get('NODE_ENV'),
              );
            });
            return wolfSchema;
          },
          inject: [ConfigService],
        },
      ],
      NEST_MULTIDB_WOLVES_CONNECTION,
    ),
  ],
  controllers: [WolvesController],
  providers: [WolvesService],
})
export class WolvesModule {}
