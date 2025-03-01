import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ILogger, LOGGER } from './pino.logger';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject(LOGGER) private readonly logger: ILogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const reply = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    // Extract additional details if available
    const details =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error
          ? exception.stack || exception.message
          : 'Unknown error';
    console.log(details);
    // Log the full error details
    this.logger.error(
      `Error occurred: ${message}`,
      exception instanceof Error ? exception.stack : exception
    );
    // Log the formatted error
    // this.logger.error({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    //   method: request.method,
    //   message,
    //   details
    // });

    // Send the error response using Fastify's API
    if (reply && typeof reply.status === 'function') {
      reply.status(status).send({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message
      });
    }
  }
}
