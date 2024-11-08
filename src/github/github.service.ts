import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';

@Injectable()
export class GithubService {
    connectOcto() {
        const octokit = new Octokit({
            auth: ""
        })
    }
}
