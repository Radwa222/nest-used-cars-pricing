import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from '../auth/dtos/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  createUser(user: CreateUserDto) {
    const $user = new this.model(user);
    return $user.save();
  }
  async findUserById(id: number) {
    return await this.model.findById(id);
  }
  async findAllUsers() {
    return this.model.find().exec();
  }
  async updateUser(id: number, attrs: Partial<User>) {
    const foundUser = await this.findUserById(id);
    if (!foundUser) throw new NotFoundException('user not found');
    Object.assign(foundUser, attrs);
    return foundUser.save();
  }
  async deleteUser(id: number) {
    const foundUser = await this.findUserById(id);
    if (!foundUser) throw new NotFoundException('user not found');
    return this.model.remove(foundUser);
  }
  async findUserByEmail(email: string) {
    return await this.model.findOne({ email });
  }
}
