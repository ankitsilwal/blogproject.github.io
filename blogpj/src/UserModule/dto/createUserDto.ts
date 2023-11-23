import { IsNotEmpty } from "@nestjs/class-validator";
import * as mongoose from "mongoose";

export class CreateUserDto {
  id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  Username: String;

  @IsNotEmpty()
  Password: String;

  @IsNotEmpty()
  Role: String;

  @IsNotEmpty()
  PNumber: Number;
}
