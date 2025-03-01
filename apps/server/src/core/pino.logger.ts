import pino from 'pino';

export const LOGGER = 'LOGGER'; // Define the LOGGER token

export interface ILogger {
  info(message: string, context?: Record<string, any>): void;
  error(message: string, trace?: any): void;
  warn(message: string, context?: Record<string, any>): void;
}
const isDevelopment = process.env.NODE_ENV !== 'production';

export class PinoLogger implements ILogger {
  private logger = pino(
    {
      level: 'info',
      timestamp: true
    },
    isDevelopment
      ? pino.transport({ target: 'pino-pretty', options: {} })
      : undefined
  );

  info(message: string, context?: Record<string, any>): void {
    if (context) {
      this.logger.info({ ...context, msg: message });
    } else {
      this.logger.info(message);
    }
  }

  error(message: string, trace?: any): void {
    if (trace) {
      this.logger.error({ trace, msg: message });
    } else {
      this.logger.error(message);
    }
  }

  warn(message: string, context?: Record<string, any>): void {
    if (context) {
      this.logger.warn({ ...context, msg: message });
    } else {
      this.logger.warn(message);
    }
  }
}
