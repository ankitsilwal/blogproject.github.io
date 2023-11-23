import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/updateUserDto";
import { User } from "./user.Schema";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  

  @Delete(":id")
  async deleteUserById(
    @Param("id") userId: mongoose.Types.ObjectId
  ): Promise<string> {
    try {
      const deletedUser = await this.userService.deleteUserById(userId);
      return `User Deleted with id ${deletedUser.id}`;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Get(":id")
  async getUserById(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      const findUserById = await this.userService.getUserById(userId);
      return findUserById;
    } catch (err) {
      return new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateUserById(
    @Param("id") userId: mongoose.Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const existsUser = await this.userService.updateById(
        userId,
        updateUserDto
      );
      return existsUser;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
