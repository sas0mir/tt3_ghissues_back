import {
  Controller,
  BadRequestException,
  Get,
  Param,
  Query,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';
import { OctokitService } from 'nestjs-octokit';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly oktokitService: OctokitService,
  ) {}

  @Get('search_user')
  async getUser(@Query('username') username: string) {
    console.log('USERNAME->', username);
    try {
      const response = await this.oktokitService.rest.search.users({
        q: username,
      });
      return response.data.items;
    } catch (error) {
      throw new BadRequestException(`Github API error: ${error.message}`);
    }
  }

  @Get('search_repo')
  async getRepo(@Query('repo') repo: string) {
    try {
      const response = await this.oktokitService.rest.search.repos({
        q: repo,
      });
      return response.data.items;
    } catch (error) {
      throw new BadRequestException(`Github API error: ${error.message}`);
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  create(@Body() dto: CreateDto) {
    console.log('post');
    return dto;
  }
}
