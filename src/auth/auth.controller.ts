import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LocalAuthGuard } from '@auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req: any) {
    return await this.authService.signin(req.user);
  }
}
