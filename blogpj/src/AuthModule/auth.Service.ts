import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/UserModule/user.service";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/UserModule/user.Schema";
import { CreateUserDto } from "src/AuthModule/Dto/createUserDto";
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectModel(User.name) private userModle: Model<User>
  ) {}

  async signin(username: string, password: string) {
    const userSign = await this.userService.findUserByusername(username);
    if (!userSign) {
      throw new UnauthorizedException("User Not Found");
    }

    const Validpassword = await bcrypt.compare(password, userSign.password);
    if (!Validpassword) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload = {
      sub: userSign.id,
      role: userSign.Role,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { accessToken };
  }

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<{ user: User; accessToken: string }> {
    const { username, password, Role, pnumber } = createUserDto;

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await this.userModle.create({
      username,
      password: hashedpassword,
      Role,
      pnumber,
    });

    const userdata = {
      sub: user.id,
      Role: user.Role,
    };
    const accessToken = this.jwtService.sign(userdata);
    return { user, accessToken };
  }
}
