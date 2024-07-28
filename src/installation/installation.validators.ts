import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Installation } from '@installation/entities/installation.entity';

export const InstallationExists = createParamDecorator(
  async (idParamName: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const installationId = +request.params[idParamName];
    const installationExists =
      !isNaN(installationId) &&
      !!(await Installation.findOneBy({ id: installationId }));
    if (!installationExists) {
      throw new BadRequestException("Installation doesn't exist");
    }
    return installationId;
  },
);
