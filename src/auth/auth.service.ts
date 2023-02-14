import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/singin-user.dto';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private JWT: JwtService) {}

  async singup(body: CreateUserDto) {
    // validate user existance
    const isUserExists = await this.usersService.findUserByEmail(body.email);
    if (isUserExists) throw new BadRequestException('email already exists');

    //hasing and salting password
    const salt = randomBytes(16).toString('hex');
    const hashed = (await scrypt(body.password, salt, 32)) as Buffer;

    const user = await this.usersService.createUser({
      ...body,
      password: `${salt}-${hashed.toString('hex')}`,
    });

    return { access_token: this.signJWT(user.email, user.id) };
  }

  async login(body: SignInDto) {
    const user = await this.usersService.findUserByEmail(body.email);
    if (!user) throw new UnauthorizedException('invalid credentials');
    const [salt, storedHash] = user.password.split('-');
    const hashed = (await scrypt(body.password, salt, 32)) as Buffer;
    if (hashed.toString('hex') !== storedHash)
      throw new UnauthorizedException('invalid credentials');
    return { access_token: this.signJWT(user.email, user.id) };
  }

  private signJWT(email: string, id: number) {
    return this.JWT.sign({
      sub: id,
      email,
    });
  }
}
