import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.Schema";
import mongoose, { Model } from "mongoose";
import { UpdateUserDto } from "./dto/updateUserDto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModle: Model<User>) {}

  async deleteUserById(userId: mongoose.Types.ObjectId): Promise<User> {
    const deleteUserById = await this.userModle.findByIdAndDelete(userId);
    if (!deleteUserById) {
      throw new NotFoundException(`User with #${userId} not found`);
    }
    return deleteUserById;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModle.find({}, { password: 0 }).exec();
    return users;
  }

  async getUserById(userId: mongoose.Types.ObjectId): Promise<User> {
    const getUserById = await this.userModle.findById(userId, { password: 0 });
    if (!getUserById) {
      throw new NotFoundException(`User with #${userId} not Found`);
    }
    return getUserById;
  }

  async updateById(
    userId: mongoose.Types.ObjectId,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const existsUser = await this.userModle.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true }
    );
    if (!existsUser) {
      throw new NotFoundException(`User with #${userId} not found`);
    }
    return existsUser;
  }

  async findUserByusername(username: string): Promise<User | null> {
    return this.userModle.findOne({ username });
  }
}
