import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../auth/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  createUser(user: CreateUserDto) {
    const $user = this.repo.create(user);
    return this.repo.save($user);
  }
  async findUserById(id: number) {
    return await this.repo.findOneBy({ id });
  }
  async findAllUsers() {
    return await this.repo.findAndCount();
  }
  async updateUser(id: number, attrs: Partial<User>) {
    const foundUser = await this.findUserById(id);
    if (!foundUser) throw new NotFoundException('user not found');
    Object.assign(foundUser, attrs);
    return this.repo.save(foundUser);
  }
  async deleteUser(id: number) {
    const foundUser = await this.findUserById(id);
    if (!foundUser) throw new NotFoundException('user not found');
    return this.repo.remove(foundUser);
  }
  async findUserByEmail(email: string) {
    return await this.repo.findOneBy({ email });
  }
}
