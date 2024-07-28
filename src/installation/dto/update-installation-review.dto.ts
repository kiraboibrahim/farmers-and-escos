import { PartialType } from '@nestjs/swagger';
import { CreateInstallationReviewDto } from '@installation/dto/create-installation-review.dto';

export class UpdateInstallationReviewDto extends PartialType(
  CreateInstallationReviewDto,
) {}
