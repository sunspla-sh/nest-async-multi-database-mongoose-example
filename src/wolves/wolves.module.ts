import { Module } from '@nestjs/common';
import { WolvesController } from './wolves.controller';
import { WolvesService } from './wolves.service';

@Module({
  imports: [],
  controllers: [WolvesController],
  providers: [WolvesService],
})
export class WolvesModule {}
