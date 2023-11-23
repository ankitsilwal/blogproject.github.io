import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/UserModule/user.service";
import * as bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async signin(Username: string, Password: string) {
    const userSign = await this.userService.findUserByUsername(Username);
    if (!userSign) {
      throw new UnauthorizedException("User Not Found");
    }

    const ValidPassword = await bcrypt.compare(Password, userSign.Password);
    if (!ValidPassword) {
      throw new UnauthorizedException("Invalid Password");
    }

    const payload = {
      sub: userSign.id,
      Role: userSign.Role,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { accessToken };
  }
}
