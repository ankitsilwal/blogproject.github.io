import { IsNotEmpty } from "@nestjs/class-validator";

export class SignInDto {
  @IsNotEmpty()
  Username: string;
  @IsNotEmpty()
  Password: string;
}
