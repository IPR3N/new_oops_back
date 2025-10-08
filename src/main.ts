// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { IoAdapter } from '@nestjs/platform-socket.io';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   // Configuration de Swagger

//   const app = await NestFactory.create(AppModule);

//   const config = new DocumentBuilder()
//     .setTitle('OOPSFARM API') // Titre de ton API
//     .setDescription('Description et documentation des API') // Description
//     .setVersion('1.0') // Version de l’API
//     .addTag('exemple') // Tag optionnel pour regrouper les endpoints
//     .build();

//   // Génère le document OpenAPI
//   const document = SwaggerModule.createDocument(app, config);

//   // Configure l’interface Swagger sur une URL (ex. /api-docs)
//   SwaggerModule.setup('api-docs', app, document);

//   app.useGlobalPipes(new ValidationPipe());
//   app.enableCors();
//   app.useWebSocketAdapter(new IoAdapter(app));
//   app.setGlobalPrefix('oopsfarm/api');
//   // app.useStaticAssets(join(__dirname, '..', 'uploads'), {
//   //   prefix: '/uploads/',
//   // });

//   await app.listen(process.env.PORT || 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    // Augmenter la limite de payload
    rawBody: true,
  });

  // Créer les dossiers uploads
  const uploadsDir = join(__dirname, '..', 'uploads');
  const profileDir = join(uploadsDir, 'profile');
  const oopsDir = join(uploadsDir, 'oops');

  [uploadsDir, profileDir, oopsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Dossier créé: ${dir}`);
    }
  });

  // Servir les fichiers statiques
  app.useStaticAssets(uploadsDir, {
    prefix: '/uploads/',
  });

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('OOPSFARM API')
    .setDescription('Description et documentation des API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  // CORS avec configuration étendue
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.useWebSocketAdapter(new IoAdapter(app));
  app.setGlobalPrefix('oopsfarm/api');

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // Écouter sur toutes les interfaces
  console.log(`🚀 Application lancée sur le port ${port}`);
  console.log(
    `📚 Documentation: https://oopsfarmback-b3823d9a75eb.herokuapp.com/api-docs`,
  );
}
bootstrap();
