import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
  NEST_MULTIDB_WOLVES_CONNECTION,
} from './constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-multidb-owners-and-cats', {
      connectionName: NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest-multidb-wolves', {
      connectionName: NEST_MULTIDB_WOLVES_CONNECTION,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
