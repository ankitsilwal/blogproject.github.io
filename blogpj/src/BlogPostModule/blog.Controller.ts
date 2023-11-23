import {
  Post,
  Body,
  Controller,
  HttpException,
  Delete,
  Param,
  BadRequestException,
  NotFoundException,
  Put,
  Get,
  Request,
  UseGuards,
} from "@nestjs/common";
import { BlogService } from "./blog.Service";
import { CreateBlogDto } from "./BlogDTO/CreateBlog.Dto";
import mongoose from "mongoose";
import { UpdateBlogDto } from "./BlogDTO/UpdateBlog.Dto";
import { Blog } from "./blog.Schema";
import { AuthGuard } from "src/AuthModule/auth.guard";
@Controller("blog")
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post("/create")
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Request() req: any) {
    try {
      const authorId = req.user.sub;
      return await this.blogService.createBlog(authorId, createBlogDto);
    } catch (err) {
      throw new HttpException(err.message, err.statuscode ?? 400);
    }
  }

  @Delete(":id")
  async deleteBlogById(
    @Param("id") blogId: mongoose.Types.ObjectId
  ): Promise<string> {
    try {
      const deletedBlog = await this.blogService.deleteBlogById(blogId);
      return `User Deleted with id ${deletedBlog.id}`;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateBlogById(
    @Param("id") blogId: mongoose.Types.ObjectId,
    @Body() updateBlogDto: UpdateBlogDto
  ) {
    try {
      const existsBlog = await this.blogService.updateById(
        blogId,
        updateBlogDto
      );
      return existsBlog;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  @Get()
  async getAllBlogs(): Promise<Blog[]> {
    const blogs = await this.blogService.getAllBlogs();
    return blogs;
  }

  @Get(":id")
  async getBlogById(@Param("id") blogId: mongoose.Types.ObjectId) {
    try {
      const findBlogById = await this.blogService.getBlogById(blogId);
      return findBlogById;
    } catch (err) {
      return new BadRequestException(err);
    }
  }
}
