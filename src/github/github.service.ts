import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GithubService {
  private octokit: Octokit;

  constructor(private configService: ConfigService) {
    const githubToken = this.configService.get<string>('GHTOKEN');

    this.octokit = new Octokit({
      auth: githubToken,
    });
  }

  async getUserData(username: string) {
    try {
      const response = await this.octokit.users.getByUsername({ username });
      return response.data;
    } catch (error) {
      throw new Error(`Github API error: ${error.message}`);
    }
  }
}
