import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({ logger: false });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter
  );

  // Add a hook to ignore /favicon.ico requests
  app
    .getHttpAdapter()
    .getInstance()
    .addHook('onRequest', (req, reply, done) => {
      if (req.url === '/favicon.ico') {
        reply.code(204).send(); // Respond with 204 No Content
        return;
      }
      done();
    });

  await app.listen(8000);
}

bootstrap();
