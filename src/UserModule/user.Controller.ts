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
import { ApiOperation, ApiResponse, ApiParam, ApiBody, ApiTags } from "@nestjs/swagger";


@ApiTags("USERS- DELETION, UPDATION & RETERIVAL")
@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "DELETE USER", description: "This will delete You" })
  @ApiParam({ name: "id", description: "USER ID", type: String })
  @ApiResponse({ status: 200, description: "User Deleted" })
  @ApiResponse({ status: 400, description: "Bad Request" })
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

  @ApiOperation({
    summary: "GET ALL USERS",
    description: "You will get all your",
  })
  @ApiResponse({ status: 200, description: "User is reterived successfully" })
  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @ApiOperation({
    summary: "GET USER BY ID",
    description:
      "You have to enter the user id,then you will reterive your user data",
  })
  @ApiParam({ name: "id", description: "User Id", type: String })
  @ApiResponse({ status: 200, description: "User is reterived successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
  @Get(":id")
  async getUserById(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      const findUserById = await this.userService.getUserById(userId);
      return findUserById;
    } catch (err) {
      return new BadRequestException(err);
    }
  }

  @ApiOperation({
    summary: "UPDATE USER BY ID",
    description: "You can update your data by User ID",
  })
  @ApiParam({ name: "id", description: "User ID", type: String })
  @ApiBody({ type: UpdateUserDto, description: "Update your data" })
  @ApiResponse({ status: 200, description: "User is updated successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
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
