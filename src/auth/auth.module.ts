import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { RefreshTokenStrategy } from './strategies';
import { PasswordResetService } from './password-reset/password-reset.service';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    PasswordResetService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
