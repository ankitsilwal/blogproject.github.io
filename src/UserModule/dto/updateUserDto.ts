import {IsNotEmpty} from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger";
export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  Role: string;

  @IsNotEmpty()
  @ApiProperty()
  pnumber: number;
}
