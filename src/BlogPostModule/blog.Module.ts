import { Module } from "@nestjs/common";
import { BlogController } from "./blog.Controller";
import { BlogService } from "./blog.Service";
import { Blog, BlogSchema } from "./blog.Schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../AuthModule/auth.module";
import { JwtService } from "@nestjs/jwt";
import { RolesGuard } from "../AuthModule/RolesGuard/role.guard";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    AuthModule,
  ],

  controllers: [BlogController],
  providers: [BlogService, JwtService, RolesGuard],
})
export class BlogModule {}
