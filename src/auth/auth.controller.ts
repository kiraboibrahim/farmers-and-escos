import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LocalAuthGuard } from '@auth/local-auth.guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiTags,
  ApiUnauthorizedResponse,
  refs,
} from '@nestjs/swagger';
import { SigninDto } from '@auth/dto/signin.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiUnauthorizedResponse({ description: 'Invalid username or password' })
  @ApiCreatedResponse({
    description: 'Successful signin',
  })
  @ApiExtraModels(SigninDto)
  @ApiBody({
    schema: {
      oneOf: refs(SigninDto),
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req: any) {
    return await this.authService.signin(req.user);
  }
}
