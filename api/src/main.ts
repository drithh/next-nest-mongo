import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'setup-swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
