import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from '../auth/dtos/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserDocument> {
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
  async findUserByPhone(mobile_number: string): Promise<UserDocument> {
    return await this.model.findOne({ mobile_number });
  }
  async changePassword(user: UserDocument, newPass: string) {
    user.password = await this.hashPassword(newPass);
    return user.save();
  }

  async hashPassword(pass: string) {
    return await bcrypt.hash(pass, 10);
  }
}
