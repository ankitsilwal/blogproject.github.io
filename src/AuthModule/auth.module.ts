import { Module } from "@nestjs/common";
import { AuthController } from "./auth.Controller";
import { AuthService } from "./auth.Service";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.Schema";
import { UserModule } from "../UserModule/user.Module";
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
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
