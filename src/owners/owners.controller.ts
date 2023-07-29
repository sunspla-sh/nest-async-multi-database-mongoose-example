import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './create-owner.dto';
import { ParseObjectIdHexStringPipe } from '../validation/pipes/parse-objectid-hex-string.pipe';

@Controller('owners')
export class OwnersController {
  constructor(private ownersService: OwnersService) {}

  @Get()
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseObjectIdHexStringPipe) id: string) {
    return this.ownersService.findById(id);
  }

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownersService.create(createOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdHexStringPipe) id: string) {
    return this.ownersService.remove(id);
  }
}
