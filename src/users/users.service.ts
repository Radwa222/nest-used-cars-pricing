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

  createUser(user: CreateUserDto): Promise<UserDocument> {
    const $user = new this.model(user);
    return $user.save();
  }
  async findUserById(id) {
    return await this.model.findOne({ _id: id });
  }
  async findAllUsers() {
    return this.model.find().exec();
  }
  async update(id, attrs: Partial<User>) {
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
  async findUserByEmail(email: string): Promise<UserDocument> {
    return await this.model.findOne({ email });
  }
  async findUserByPhone(phone: string): Promise<UserDocument> {
    return await this.model.findOne({ phone });
  }
}
