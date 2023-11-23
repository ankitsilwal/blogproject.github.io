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
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";
import { RolesGuard } from "src/AuthModule/role.guard";
import { UserRoles } from "src/role.decorator";
import { UserRole } from "src/UserModule/dto/createUserDto";

@ApiTags("BLOG- CREATION, DELETION, UPDATION & RETERIVAL")
@Controller("blog")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UserRoles(UserRole.ADMIN, UserRole.SOFTWAREDEVELOPER)
  @ApiOperation({
    summary: "CREATE BLOG",
    description: "This will create your blog",
  })
  @ApiBody({ type: CreateBlogDto, description: "Enter blog details" })
  @ApiResponse({ status: 201, description: "Blog is created successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
  @Post("/create")
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Request() req: any) {
    try {
      const authorId = req.user.sub;
      return await this.blogService.createBlog(authorId, createBlogDto);
    } catch (err) {
      throw new HttpException(err.message, err.statuscode ?? 400);
    }
  }

  @ApiOperation({
    summary: "DELETE BLOG",
    description: "This will delete your blog",
  })
  @ApiParam({
    name: "id",
    description: "Enter your Blog Id to delete",
    type: String,
  })
  @ApiResponse({ status: 200, description: "Blog is delted successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
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

  @ApiOperation({
    summary: "UPDATE BLOG",
    description: "This will update your blog",
  })
  @ApiParam({
    name: "id",
    description: "Enter your Blog Id to delete",
    type: String,
  })
  @ApiBody({ type: UpdateBlogDto, description: "Enter updated data" })
  @ApiResponse({ status: 200, description: "Blog is Updated successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
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

  @ApiOperation({ summary: "GET BLOG", description: "This will Get all blogs" })
  @ApiResponse({ status: 200, description: "Blogs are reterived successfully" })
  @Get()
  async getAllBlogs(): Promise<Blog[]> {
    const blogs = await this.blogService.getAllBlogs();
    return blogs;
  }

  @ApiOperation({
    summary: "GET BLOG BY ID",
    description: "This will Get your blog",
  })
  @ApiParam({
    name: "id",
    description: "Enter your Blog Id to Reterive",
    type: String,
  })
  @ApiResponse({ status: 200, description: "Blog is Reterived successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
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
