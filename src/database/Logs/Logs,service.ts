import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logs } from '../schemas/Logs.schema';
import { Model } from 'mongoose';
import { CreateLogsDto } from './dto/Logs.dto';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Logs.name) private logsModel: Model<Logs>) {}

  createLog(createUserDto: CreateLogsDto) {
    const newLog = new this.logsModel(createUserDto);
    return newLog.save();
  }
}
