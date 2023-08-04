import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ParseObjectIdHexStringPipe } from '../validation/pipes/parse-objectid-hex-string.pipe';
import { WolvesService } from './wolves.service';
import { CreateWolfDto } from './create-wolf.dto';

@Controller('wolves')
export class WolvesController {
  constructor(private wolvesService: WolvesService) {}

  @Get()
  findAll() {
    return this.wolvesService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseObjectIdHexStringPipe) id: string) {
    return this.wolvesService.findById(id);
  }

  @Post()
  create(@Body() createWolfDto: CreateWolfDto) {
    return this.wolvesService.create(createWolfDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdHexStringPipe) id: string) {
    return this.wolvesService.remove(id);
  }
}
