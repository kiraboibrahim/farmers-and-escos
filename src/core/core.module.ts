import { Global, Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';

@Global()
@Module({
  imports: [AuthModule, RoleModule, PermissionModule],
  exports: [AuthModule, RoleModule, PermissionModule],
})
export class CoreModule {}
