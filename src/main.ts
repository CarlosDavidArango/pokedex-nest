import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { //transforma los valores de los query params a los tipos de datos especificados en los DTO
        enableImplicitConversion: true
      }
    }
  ));
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on port ${process.env.PORT}`);
}
bootstrap();
