import { Module } from '@nestjs/common';
import { InstallationService } from './installation.service';
import { InstallationController } from './installation.controller';

@Module({
  controllers: [InstallationController],
  providers: [InstallationService],
})
export class InstallationModule {}
