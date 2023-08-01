import { Controller } from '@nestjs/common';
import { WolvesService } from './wolves.service';

@Controller('wolves')
export class WolvesController {
  constructor(private wolvesService: WolvesService) {}
}
