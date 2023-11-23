import {IsNotEmpty} from "@nestjs/class-validator"


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