import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http.exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import validateEnv from './env.init';

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useStaticAssets(path.join(__dirname, '/../public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  //app.useGlobalInterceptors(new ResponseInterceptor());
  const options = new DocumentBuilder()
    .setTitle('Books Route')
    .setDescription('Апи для книг')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
  app.setViewEngine('hbs');
  await app.listen(1337);
}
bootstrap();
