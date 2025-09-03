import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Configuration de Swagger

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('OOPSFARM API') // Titre de ton API
    .setDescription('Description et documentation des API') // Description
    .setVersion('1.0') // Version de l’API
    .addTag('exemple') // Tag optionnel pour regrouper les endpoints
    .build();

  // Génère le document OpenAPI
  const document = SwaggerModule.createDocument(app, config);

  // Configure l’interface Swagger sur une URL (ex. /api-docs)
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  app.setGlobalPrefix('oopsfarm/api');
  // app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  //   prefix: '/uploads/',
  // });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
