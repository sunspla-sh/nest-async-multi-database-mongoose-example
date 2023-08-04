import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ParseObjectIdHexStringPipe } from '../validation/pipes/parse-objectid-hex-string.pipe';
import { WolvesService } from './wolves.service';
import { WolfDocument } from './schemas/wolf.schema';
import { CreateWolfDto } from './create-wolf.dto';

@Controller('wolves')
export class WolvesController {
  constructor(private wolvesService: WolvesService) {}

  @Get()
  findAll(): Promise<WolfDocument[]> {
    return this.wolvesService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id', ParseObjectIdHexStringPipe) id: string,
  ): Promise<WolfDocument> {
    return this.wolvesService.findById(id);
  }

  @Post()
  create(@Body() createWolfDto: CreateWolfDto): Promise<WolfDocument> {
    return this.wolvesService.create(createWolfDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseObjectIdHexStringPipe) id: string,
  ): Promise<WolfDocument> {
    return this.wolvesService.remove(id);
  }
}
