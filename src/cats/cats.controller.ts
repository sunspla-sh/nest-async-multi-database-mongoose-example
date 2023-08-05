import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './create-cat.dto';
import { CreateCatArrayDto } from './create-cat-array.dto';
import { ParseObjectIdHexStringPipe } from '../validation/pipes/parse-objectid-hex-string.pipe';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(): Promise<CatDocument[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id', ParseObjectIdHexStringPipe) id: string,
  ): Promise<CatDocument> {
    return this.catsService.findById(id);
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<CatDocument> {
    return this.catsService.create(createCatDto);
  }

  @Post('multiple')
  createMultiple(
    @Body() createCatArrayDto: CreateCatArrayDto,
  ): Promise<CatDocument[]> {
    return this.catsService.createMultiple(createCatArrayDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseObjectIdHexStringPipe) id: string,
  ): Promise<CatDocument> {
    return this.catsService.remove(id);
  }
}
