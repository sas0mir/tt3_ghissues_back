import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { LogsService } from './Logs,service';
import { CreateLogsDto } from './dto/Logs.dto';

@Controller('Logs')
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Post()
  createLog(@Body() createLogsDto: CreateLogsDto) {
    console.log(createLogsDto);
  }

  @Get('get_logs')
  async loadLogs(@Query('to') to: number, @Query('from') from: number) {
    try {
      const response = await this.logsService.getLogs(from, to);
      return response;
    } catch (error) {
      throw new BadRequestException(`Github API error: ${error.message}`);
    }
  }
}
