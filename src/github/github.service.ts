import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//import { Octokit } from '@octokit/core';

@Injectable()
export class GithubService {
  private octokit: any;

  constructor(private configService: ConfigService) {
    this.initOctokit();
  }

  async initOctokit() {
    const { Octokit } = await import('@octokit/rest');
    const githubToken = this.configService.get<string>('GHTOKEN');
    this.octokit = new Octokit({
      auth: githubToken,
    });
  }

  async getUserData(username: string) {
    try {
      const response = await this.octokit.request('GET /users/{username}', {
        username,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Github API error: ${error.message}`);
    }
  }
}
