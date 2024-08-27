import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IPAddressGuard implements CanActivate {
  constructor(private allowedIPAddress: string) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const IPV6_NETWORK_PREFIX = '::ffff:';
    const IPV6_NETWORK_PREFIX_OFFSET = 7;
    const req = context.switchToHttp().getRequest();
    let clientIPAddress =
      req.headers['x-forwarded-for'] || (req.socket.remoteAddress as string);
    if (clientIPAddress.startsWith(IPV6_NETWORK_PREFIX)) {
      clientIPAddress = clientIPAddress.substring(IPV6_NETWORK_PREFIX_OFFSET);
    }
    const allowClientIPAddress = clientIPAddress === this.allowedIPAddress;
    if (!allowClientIPAddress) {
      throw new ForbiddenException('IP Address not allowed');
    }
    return allowClientIPAddress;
  }
}
