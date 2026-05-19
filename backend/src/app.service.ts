import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor() {
    this.logger.log('AppService Initialized');
  }

  /**
   * Health Check Service
   */
  getHealthStatus() {
    this.logger.log('Health status checked');

    return {
      status: 'success',
      message: 'Server is running successfully',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Welcome Service
   */
  getWelcomeMessage() {
    return {
      app: 'Peer Learning Platform',
      message: 'Welcome to the backend API service',
      version: '1.0.0',
    };
  }
}
