import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@core/core.module';
import { AuthModule } from '@auth/auth.module';
import { ProductModule } from '@product/product.module';
import { FarmerModule } from '@farmer/farmer.module';
import { EscoModule } from '@esco/esco.module';
import { OfferModule } from '@offer/offer.module';
import { IotModule } from '@iot/iot.module';
import { InstallationModule } from '@installation/installation.module';
import { DatabaseModule } from '@database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    ProductModule,
    FarmerModule,
    EscoModule,
    OfferModule,
    IotModule,
    InstallationModule,
    DatabaseModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
