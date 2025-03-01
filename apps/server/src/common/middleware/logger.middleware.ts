import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { PinoLogger } from '../../core/pino.logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLogger) {}

  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const { method, url, body } = req;
    this.logger.info(`Incoming request: ${method} ${url}`, { body }); // Log the request
    next();
  }
}
