import {
  Controller,
  BadRequestException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get/:id')
  getHello(@Param('id', ParseIntPipe) id: number) {
    if (id < 1) {
      throw new BadRequestException('id must by mare than 0');
    }
    return id;
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  create(@Body() dto: CreateDto) {
    console.log('post');
    return dto;
  }
}
