import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger/dist";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SOFTWAREDEVELOPER = "Software Developer",
}
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  Username: String;
  @ApiProperty()
  @IsNotEmpty()
  Password: String;

  @ApiProperty()
  @IsEnum(UserRole)
  Role: UserRole;

  @IsNotEmpty()
  @IsNumber()
  PNumber: Number;
}
