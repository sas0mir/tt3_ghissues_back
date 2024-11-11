import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
//библиотека октокит не собирается под CommonJS использую готовую для nest библиотеку
//import { GithubModule } from './github/github.module';
import { ConfigModule } from '@nestjs/config';
import { OctokitModule } from 'nestjs-octokit';

@Module({
  imports: [
    DatabaseModule,
    OctokitModule.forRoot({
      isGlobal: true,
      octokitOptions: {
        auth: process.env.GHTOKEN,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
