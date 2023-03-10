import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/singin-user.dto';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private JWT: JwtService,
    private configService: ConfigService,
  ) {}

  async singup(body: CreateUserDto): Promise<Tokens> {
    // validate mail
    const isUniqueMail = await this.usersService.findUserByEmail(body.email);
    if (isUniqueMail) throw new BadRequestException('email already exists');

    // validate mobile number
    const isUniquePhone = await this.usersService.findUserByPhone(
      body.mobile_number,
    );
    if (isUniquePhone)
      throw new BadRequestException('mobile number already exists');

    //hasing and salting password
    const hashed = await this.usersService.hashPassword(body.password);

    const user = await this.usersService.createUser({
      ...body,
      password: hashed,
    });
    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refresh_token);

    return tokens;
  }

  async login(body: SignInDto): Promise<Tokens> {
    const user = await this.usersService.findUserByEmail(body.email);
    if (!user) throw new UnauthorizedException('invalid credentials');

    const isValidPass = await bcrypt.compare(body.password, user.password);
    if (!isValidPass) throw new UnauthorizedException('invalid credentials');
    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refresh_token: null });
  }

  async refresh(userId: any, refresh_token: string): Promise<Tokens> {
    const user = await this.usersService.findUserById(userId);
    if (!user || !user.refresh_token) throw new ForbiddenException();
    const isMatched = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!isMatched) throw new ForbiddenException();
    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(userId: any, email: string): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.JWT.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.JWT.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }
  async updateRefreshToken(userId, refresh_token: string) {
    const hashed = await this.hashData(refresh_token);
    await this.usersService.update(userId, {
      refresh_token: hashed,
    });
  }
}
