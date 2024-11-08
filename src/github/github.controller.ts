import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('api')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('search_user')
  searchUser(@Query('name') name: string): string[] {
    console.log('API->', name);
    return [name, 'axel', 'dori'];
  }
}
