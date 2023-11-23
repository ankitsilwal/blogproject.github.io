import {
  Body,
  Controller,
  HttpException,
  NotFoundException,
  Post,
} from "@nestjs/common";
import { AuthService } from "./auth.Service";
import { SignInDto } from "./Dto/signin.Dto";
<<<<<<< Updated upstream
import { CreateUserDto } from "src/UserModule/dto/createUserDto";
import { UserService } from "src/UserModule/user.service";

=======
import { CreateUserDto } from "src/AuthModule/Dto/createUserDto";
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("USER CREATION & AUTHENTICATION")
>>>>>>> Stashed changes
@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

<<<<<<< Updated upstream


=======
  @ApiOperation({ summary: "ADD USER", description: "You will be added" })
  @ApiBody({ type: CreateUserDto, description: "Enter your data" })
  @ApiResponse({ status: 201, description: "You are added Successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
>>>>>>> Stashed changes
  @Post("/signup")
  async addUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.createUser(createUserDto);
    } catch (err) {
      throw new HttpException(err.message, err.statuscode ?? 400);
    }
  }

<<<<<<< Updated upstream

  @Post('signin')
=======
  @ApiBearerAuth()
  @ApiOperation({ summary: "LOGIN USER", description: "You will be Logged In" })
  @ApiBody({ type: SignInDto, description: "Enter your data" })
  @ApiResponse({ status: 201, description: "You are login Successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
  @Post("signin")
>>>>>>> Stashed changes
  async signin(@Body() signInDto: SignInDto) {
    try {
      const res = await this.authService.signin(
        signInDto.username,
        signInDto.password
      );
      return res;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
