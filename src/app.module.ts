import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate, EnvVariables } from './validation/env/env.validate';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
  NEST_MULTIDB_WOLVES_CONNECTION,
} from './constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnersModule } from './owners/owners.module';
import { CatsModule } from './cats/cats.module';
import { WolvesModule } from './wolves/wolves.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvVariables>) => ({
        uri: configService.get('OWNERS_AND_CATS_DB'),
      }),
      connectionName: NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvVariables>) => ({
        uri: configService.get('WOLVES_DB'),
      }),
      connectionName: NEST_MULTIDB_WOLVES_CONNECTION,
      inject: [ConfigService],
    }),
    OwnersModule,
    CatsModule,
    WolvesModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
