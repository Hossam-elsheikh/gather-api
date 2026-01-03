import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // insures that any data not in dto wo'nt be passed to the controller
      forbidNonWhitelisted: true, // forbids and throws an error if data not in dto passed
      transform: true, // transform the incoming request to an instance to dto class after validation
    }),
  );
  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Gather API')
    .setDescription('Gather API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3030);
}
bootstrap();
