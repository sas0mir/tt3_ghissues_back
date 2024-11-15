import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, LogsSchema } from '../schemas/Logs.schema';
import { Actions, ActionsSchema } from '../schemas/Actions.schema';
import { LogsService } from './Logs,service';
import { LogsController } from './Logs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Logs.name,
        schema: LogsSchema,
      },
      {
        name: Actions.name,
        schema: ActionsSchema,
      },
    ]),
  ],
  providers: [LogsService],
  controllers: [LogsController],
  exports: [LogsService],
})
export class LogsModule {}
