import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, LogsSchema } from '../schemas/Logs.schema';
import { LogsService } from './Logs,service';
import { LogsController } from './Logs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Logs.name,
        schema: LogsSchema,
      },
    ]),
  ],
  providers: [LogsService],
  controllers: [LogsController],
})
export class LogsModule {}
