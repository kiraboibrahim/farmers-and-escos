import { Module } from '@nestjs/common';
import { InstallationService } from './installation.service';
import { InstallationController } from './installation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Installation } from '@installation/entities/installation.entity';
import { InstallationReview } from '@installation/entities/installation-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Installation, InstallationReview])],
  controllers: [InstallationController],
  providers: [InstallationService],
})
export class InstallationModule {}
