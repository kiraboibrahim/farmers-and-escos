import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDeveloperInfo(): string {
    return `
      <h1>Farmers and Escos API</h1>
      <div>
        <p>Read <a href="/docs">Documentation</a></p>
        <p>Developed with <3 by <a href='https://github.com/kiraboibrahim'>Kirabo Ibrahim</a></p>
      </div>
      `;
  }
}
