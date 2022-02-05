import { Controller, Post, UseGuards, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from '../../auth/auth.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { ApiResponse, Public } from '../../common/decorators';
import { RequestExtension } from '../../common/utils/http-helpers';
import { OpenApiTag } from '../../open-api/setup-open-api';
import { RoutePrefix } from '../routes';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags(OpenApiTag.LOGIN)
@Controller(RoutePrefix.LOGIN)
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse.Forbidden
  async login(@Request() request: RequestExtension): Promise<LoginResponseDto> {
    return this.authService.login(request.user as User);
  }
}
