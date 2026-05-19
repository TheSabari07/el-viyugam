import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Root Endpoint
   */
  @Get()
  getWelcome() {
    return this.appService.getWelcomeMessage();
  }

  /**
   * Health Check Endpoint
   */
  @Get('health')
  getHealthStatus() {
    return this.appService.getHealthStatus();
  }
}
