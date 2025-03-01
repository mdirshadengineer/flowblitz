import { Module, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { PinoLogger, LOGGER } from './pino.logger';
import { GlobalExceptionFilter } from './global-exception.filter';

const loggerProvider: Provider = {
  provide: LOGGER,
  useClass: PinoLogger
};

// Factory provider for LoggerMiddleware
const loggerMiddlewareProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useFactory: (logger: PinoLogger) => new LoggerMiddleware(logger), // Inject PinoLogger
  inject: [LOGGER] // Inject the LOGGER token
};

@Module({
  providers: [
    loggerProvider,
    loggerMiddlewareProvider,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ],
  exports: [loggerProvider] // Export the logger provider
})
export class CoreModule {}
