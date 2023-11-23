import { IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  Username: string;

  @IsNotEmpty()
  @ApiProperty()
  Password: string;

  @IsNotEmpty()
  @ApiProperty()
  Role: string;

  @IsNotEmpty()
  @ApiProperty()
  PNumber: number;
}
