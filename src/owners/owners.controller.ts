import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';

@Controller('owners')
export class OwnersController {
  @Get()
  findAll() {
    return;
  }

  @Get('id')
  findById() {
    return;
  }

  @Post()
  create() {
    return;
  }

  @Delete('id')
  remove() {
    return;
  }
}
