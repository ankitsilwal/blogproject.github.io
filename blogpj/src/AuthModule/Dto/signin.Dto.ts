import { IsNotEmpty } from "@nestjs/class-validator";

export class SignInDto {
  @IsNotEmpty()
<<<<<<< Updated upstream
  Username: string;
=======
  username: string;
  @ApiProperty()
>>>>>>> Stashed changes
  @IsNotEmpty()
  password: string;
}
