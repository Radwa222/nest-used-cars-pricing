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
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
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
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findUserById(@Param('id') id: string) {
    const user = await this.service.findUserById(+id);
    return user ? user : null;
  }
  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllUsers() {
    return await this.service.findAllUsers();
  }

  @Delete()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.service.deleteUser(+id);
  }

  @Patch()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUser(@Query('id') id: string, @Body() user: UpdateUserDto) {
    return await this.service.updateUser(+id, user);
  }
}
