import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ApiResponse, Public } from '../common/decorators';
import { RequestExtension } from '../common/http-helpers';
import { OpenApiTag } from '../open-api/setup-open-api';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags(OpenApiTag.LOGIN)
@Controller(OpenApiTag.LOGIN)
export class LoginController {
  constructor(private authService: AuthService) {}

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
