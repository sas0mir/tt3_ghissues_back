import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './Logs/Logs.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://sasmir:Cvbhyjd1989@127.0.0.1/ghissues'),
    LogsModule,
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
