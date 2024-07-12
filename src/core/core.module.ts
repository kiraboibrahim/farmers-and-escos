import { Global, Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';
import { StorageModule } from '../storage/storage.module';

@Global()
@Module({
  imports: [AuthModule, RoleModule, PermissionModule, StorageModule],
  exports: [AuthModule, RoleModule, PermissionModule, StorageModule],
})
export class CoreModule {}
