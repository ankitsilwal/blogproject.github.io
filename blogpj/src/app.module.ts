import { Module } from "@nestjs/common";
import { UserModule } from "./UserModule/user.Module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./AuthModule/auth.module";
import { BlogModule } from "./BlogPostModule/blog.Module";
import { RolesGuard } from "./AuthModule/RolesGuard/role.guard";
import { APP_GUARD } from "@nestjs/core";
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    BlogModule
  ],
})
export class AppModule {}
