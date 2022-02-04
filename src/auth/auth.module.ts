import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvConfig } from '../common/config';
import { UserModule } from '../resources/user/user.module';
import { UserService } from '../resources/user/user.service';
import { PrismaService } from '../services/prisma.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginController } from './login.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: EnvConfig.jwtKey,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [LoginController],
})
export class AuthModule {}
