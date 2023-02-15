import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { Serialize } from '../interceptors/serialize-interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('user')
@Serialize(UserDto)
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findUserById(@Param('id') id: string) {
    const user = await this.service.findUserById(+id);
    return user ? user : null;
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllUsers() {
    return await this.service.findAllUsers();
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.service.deleteUser(+id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateUser(@Query('id') id: string, @Body() user: UpdateUserDto) {
    return await this.service.update(id, user);
  }
}
