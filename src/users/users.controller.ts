import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { Serialize } from '../common/interceptors/serialize-interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('user')
@Serialize(UserDto)
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.service.findUserById(+id);
    return user ? user : null;
  }
  @Get()
  async findAllUsers() {
    return await this.service.findAllUsers();
  }

  @Delete()
  async deleteUser(@Param('id') id: string) {
    return await this.service.deleteUser(+id);
  }

  @Patch()
  async updateUser(@Query('id') id: string, @Body() user: UpdateUserDto) {
    return await this.service.update(id, user);
  }
}
