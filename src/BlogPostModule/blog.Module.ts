import { Module } from "@nestjs/common";
import { BlogController } from "./blog.Controller";
import { BlogService } from "./blog.Service";
import { Blog, BlogSchema } from "./blog.Schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../AuthModule/auth.module";
import { JwtService } from "@nestjs/jwt";
<<<<<<< Updated upstream:src/BlogPostModule/blog.Module.ts
import { RolesGuard } from "../AuthModule/RolesGuard/role.guard";
=======
import { RolesGuard } from "src/AuthModule/RolesGuard/role.guard";
>>>>>>> Stashed changes:blogpj/src/BlogPostModule/blog.Module.ts

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    AuthModule,
  ],

  controllers: [BlogController],
  providers: [BlogService, JwtService, RolesGuard],
})
export class BlogModule {}
