import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { GlobalExceptionFilter } from 'src/core/global-exception.filter';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { GraphqlModule } from './graphql/graphql.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [CoreModule, DatabaseModule, GraphqlModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(<Middleware>).forRoutes('*');
  }
}
