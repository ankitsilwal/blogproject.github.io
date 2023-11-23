import {IsNotEmpty} from "@nestjs/class-validator"

<<<<<<< Updated upstream

export class UpdateUserDto{

    @IsNotEmpty()
    Username: string;
    @IsNotEmpty()
    Password: string;
    @IsNotEmpty()
    Role: string;
    @IsNotEmpty()
    PNumber: number;
}
=======
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
>>>>>>> Stashed changes
