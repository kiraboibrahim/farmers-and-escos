import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { VERSION } from '@core/core.constants';

// Load IANA timezone names
require('@js-joda/timezone');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = +configService.get<string>('LISTEN_PORT');
  setupVersioning(app);
  setupClassValidatorContainer(app);
  setupSwagger(app);
  setupCrossOrigin(app);
  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

function setupVersioning(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION,
  });
}

function setupClassValidatorContainer(app: INestApplication) {
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
}

function setupCrossOrigin(app: INestApplication) {
  app.enableCors({ origin: true });
}

function setupSwagger(app: INestApplication) {
  const TITLE = 'Farmers and ESCOs API';
  const DESCRIPTION =
    'A system that bridges the gap between farmers and energy service companies. Agricultural services are just one click away from the farmer';
  const SWAGGER_URI = 'docs';
  const documentConfig = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup(SWAGGER_URI, app, document);
}

bootstrap();
