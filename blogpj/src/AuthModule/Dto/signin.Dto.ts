import { IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  Username: string;
  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}
