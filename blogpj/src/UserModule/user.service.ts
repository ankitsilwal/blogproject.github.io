import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.Schema";
import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/createUserDto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UpdateUserDto } from "./dto/updateUserDto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModle: Model<User>,
    private jwtService: JwtService
  ) {}

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<{ user: User; accessToken: string }> {
    const { Username, Password, Role, PNumber } = createUserDto;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await this.userModle.create({
      Username,
      Password: hashedPassword,
      Role,
      PNumber,
    });

    const userdata = {
      sub: user.id,
      Role: user.Role,
    };
    const accessToken = this.jwtService.sign(userdata);
    return { user, accessToken };
  }

  async deleteUserById(userId: mongoose.Types.ObjectId): Promise<User> {
    const deleteUserById = await this.userModle.findByIdAndDelete(userId);
    if (!deleteUserById) {
      throw new NotFoundException(`User with #${userId} not found`);
    }
    return deleteUserById;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModle.find({}, { Password: 0 }).exec();
    return users;
  }

  async getUserById(userId: mongoose.Types.ObjectId): Promise<User> {
    const getUserById = await this.userModle.findById(userId, { Password: 0 });
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

  async findUserByUsername(Username: string): Promise<User | null> {
    return this.userModle.findOne({ Username });
  }
}
