import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';
import { CreateCatArrayDto } from './create-cat-array.dto';
import { ParseObjectIdPipe } from '../validation/pipes/parse-objectid.pipe';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.catsService.findById(id);
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Post()
  createMany(@Body() createCatArrayDto: CreateCatArrayDto) {
    return this.catsService.createMultiple(createCatArrayDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.catsService.remove(id);
  }
}
