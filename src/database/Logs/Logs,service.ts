import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logs } from '../schemas/Logs.schema';
import { Model } from 'mongoose';
import { CreateLogsDto } from './dto/Logs.dto';
import { Actions } from '../schemas/Actions.schema';

@Injectable()
export class LogsService implements OnModuleInit {
  constructor(
    @InjectModel(Logs.name) private logsModel: Model<Logs>,
    @InjectModel(Actions.name) private actionsModel: Model<Actions>,
  ) {}

  async onModuleInit() {
    const count = await this.actionsModel.countDocuments();
    if (count === 0) {
      console.log('Init Actions model with default data');
      const initialData = [
        { id: 1, name: 'search user', updated_at: Date.now },
        { id: 2, name: 'search repo', updated_at: Date.now },
        { id: 3, name: 'search issues', updated_at: Date.now },
        { id: 4, name: 'get issues', updated_at: Date.now },
        { id: 5, name: 'get issue', updated_at: Date.now },
      ];
      await this.actionsModel.insertMany(initialData);
      console.log('Actions model has been initialized');
    } else {
      console.log('Actions model already initialized');
    }
  }

  createLog(createLogDto: CreateLogsDto) {
    const newLog = new this.logsModel(createLogDto);
    return newLog.save();
  }

  getLogs(from: number, to: number) {
    const logs = this.logsModel
      .find()
      .skip(from)
      .limit(to)
      .populate('type', 'name')
      .exec();
    return logs;
  }
}
