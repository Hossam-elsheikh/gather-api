import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // insures that any data not in dto wo'nt be passed to the controller
      forbidNonWhitelisted:true, // forbids and throws an error if data not in dto passed
      transform: true // transform the incoming request to an instance to dto class after validation
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
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
