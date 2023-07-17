import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';

@Controller('cats')
export class CatsController {
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

  @Post()
  createMany() {
    return;
  }

  @Delete('id')
  remove() {
    return;
  }
}
