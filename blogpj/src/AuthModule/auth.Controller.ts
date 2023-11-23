import { Body, Controller, HttpException, NotFoundException, Post } from "@nestjs/common";
import { AuthService } from "./auth.Service";
import { SignInDto } from "./Dto/signin.Dto";
import { CreateUserDto } from "src/UserModule/dto/createUserDto";
import { UserService } from "src/UserModule/user.service";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService,
    private userService: UserService) {}



  @Post("/signup")
  async addUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (err) {
      throw new HttpException(err.message, err.statuscode ?? 400);
    }
  }


  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    try {
      const res = await this.authService.signin(
        signInDto.Username,
        signInDto.Password
      );
      return res;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
