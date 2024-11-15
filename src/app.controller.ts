import {
  Controller,
  BadRequestException,
  Get,
  Query,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';
import { OctokitService } from 'nestjs-octokit';
import { LogsService } from './database/Logs/Logs,service';
import { Request } from 'express';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly oktokitService: OctokitService,
    private readonly logsService: LogsService,
  ) {}

  @Get('search_user')
  async getUser(@Query('username') username: string, @Req() req: Request) {
    console.log('USERNAME->', username);
    try {
      const response = await this.oktokitService.rest.search.users({
        q: username,
      });
      this.logsService.createLog({
        userIp: req.ip || 'ip hidden',
        date: new Date(),
        type: 1,
        success: true,
      });
      return response.data.items;
    } catch (error) {
      this.logsService.createLog({
        userIp: req.ip || 'ip hidden',
        date: new Date(),
        type: 1,
        success: false,
      });
      throw new BadRequestException(`Github API error: ${error.message}`);
    }
  }

  @Get('search_repo')
  async getRepo(@Query('username') username: string, @Req() req: Request) {
    try {
      const response = await this.oktokitService.rest.repos.listForUser({
        username: username,
        type: 'all',
      });
      this.logsService.createLog({
        userIp: req.ip || 'ip hidden',
        date: new Date(),
        type: 2,
        success: true,
      });
      return response.data;
    } catch (error) {
      this.logsService.createLog({
        userIp: req.ip || 'ip hidden',
        date: new Date(),
        type: 2,
        success: false,
      });
      throw new BadRequestException(`Github API error: ${error.message}`);
    }
  }

  @Get('search_issues')
  async getIssues(
    @Query('owner') owner: string,
    @Query('repo') repo: string,
    @Query('perpage') perpage: number,
    @Query('page') page: number,
    @Req() req: Request,
  ) {
    try {
      const response = await this.oktokitService.rest.issues.listForRepo({
        owner: owner,
        repo: repo,
        per_page: perpage || 30,
        page: page || 1,
      });
      this.logsService.createLog({
        userIp: req.ip || 'ip hidden',
        date: new Date(),
        type: 3,
        success: true,
      });
      return response.data;
    } catch (error) {
      this.logsService.createLog({
        userIp: req.ip || 'ip hidden',
        date: new Date(),
        type: 3,
        success: false,
      });
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
