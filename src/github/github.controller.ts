import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('api')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('search_user')
  async searchUser(@Query('name') name: string) {
    return this.githubService.getUserData(name);
  }
}
