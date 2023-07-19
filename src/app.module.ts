import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NEST_MULTIDB_MONGOOSE_1, NEST_MULTIDB_MONGOOSE_2 } from './constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-multidb-mongoose-1', {
      connectionName: NEST_MULTIDB_MONGOOSE_1,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest-multidb-mongoose-2', {
      connectionName: NEST_MULTIDB_MONGOOSE_2,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
