import { Module } from "@nestjs/common";
import { AuthController } from "./auth.Controller";
import { AuthService } from "./auth.Service";
import { UserModule } from "src/UserModule/user.Module";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "src/UserModule/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/UserModule/user.Schema";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({
      secret: `${process.env.SECRET_KEY}`,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [JwtModule],
})
export class AuthModule {}
