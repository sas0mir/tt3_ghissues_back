import { Controller, Post, Body } from '@nestjs/common';
import { LogsService } from './Logs,service';
import { CreateLogsDto } from './dto/Logs.dto';

@Controller('Logs')
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Post()
  createLog(@Body() createLogsDto: CreateLogsDto) {
    console.log(createLogsDto);
  }
}
