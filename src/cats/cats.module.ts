import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';
// import mongooseAutoPopulate from 'mongoose-autopopulate';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: Cat.name,
          useFactory: () => {
            const catSchema = CatSchema;
            catSchema.pre('save', function (next) {
              console.log('this FIRST pre-hook runs before cat is saved');
              next(); //need to call next to trigger additional hooks otherwise the server hangs until response times out
            });
            catSchema.pre('save', function () {
              console.log('this SECOND pre-hook also runs before cat is saved');
            });
            catSchema.post('save', function () {
              console.log('this post-hook runs after the cat is saved');
            });
            catSchema.post('findOne', function () {
              console.log(
                'this post-hook runs after a cat is found with findOne, findById etc',
              );
            });
            /**
             * There are some type mismatches due to a bug in the package if we try
             * to import, so switch to require and then disable the inline require eslint error.
             */
            // catSchema.plugin(mongooseAutoPopulate);
            catSchema.plugin(require('mongoose-autopopulate')); //eslint-disable-line
            return catSchema;
          },
        },
      ],
      NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
    ),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
