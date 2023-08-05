import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './create-owner.dto';
import { OwnerDocument } from './schemas/owner.schema';
import { ParseObjectIdHexStringPipe } from '../validation/pipes/parse-objectid-hex-string.pipe';

@Controller('owners')
export class OwnersController {
  constructor(private ownersService: OwnersService) {}

  @Get()
  findAll(): Promise<OwnerDocument[]> {
    return this.ownersService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id', ParseObjectIdHexStringPipe) id: string,
  ): Promise<OwnerDocument> {
    return this.ownersService.findById(id);
  }

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto): Promise<OwnerDocument> {
    return this.ownersService.create(createOwnerDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseObjectIdHexStringPipe) id: string,
  ): Promise<OwnerDocument> {
    return this.ownersService.remove(id);
  }
}
