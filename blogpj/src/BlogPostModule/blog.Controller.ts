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
  Req,
} from "@nestjs/common";
import { BlogService } from "./blog.Service";
import { CreateBlogDto } from "./BlogDTO/CreateBlog.Dto";
import mongoose from "mongoose";
import { UpdateBlogDto } from "./BlogDTO/UpdateBlog.Dto";
import { Blog } from "./blog.Schema";
import { AuthGuard } from "src/AuthModule/auth.guard";
<<<<<<< Updated upstream
=======
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";
import { RolesGuard } from "src/AuthModule/RolesGuard/role.guard";
import { UserRoles } from "src/AuthModule/RolesGuard/role.decorator";
import { UserRole } from "src/AuthModule/Dto/createUserDto";

@ApiTags("BLOG- CREATION, DELETION, UPDATION & RETERIVAL")
>>>>>>> Stashed changes
@Controller("blog")
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

<<<<<<< Updated upstream
  @Post("/create")
=======
  //Create Blog----------------------------------------------------------------------------------------------------------------------------------------
  @UserRoles(UserRole.ADMIN, UserRole.USER, UserRole.VIEWER)
  @ApiOperation({
    summary: "CREATE BLOG",
    description: "This will create your blog",
  })
  @ApiBody({ type: CreateBlogDto, description: "Enter blog details" })
  @ApiResponse({ status: 201, description: "Blog is created successfully" })
  @ApiResponse({ status: 400, description: "BAD REQUEST" })
  @Post("")
>>>>>>> Stashed changes
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Request() req: any) {
    try {
      const authorId = req.user.sub;
      return await this.blogService.createBlog(authorId, createBlogDto);
    } catch (err) {
      throw new HttpException(err.message, err.statuscode ?? 400);
    }
  }

<<<<<<< Updated upstream
=======
  // Delete Blog--------------------------------------------------------------------------------------------------------------------------------------------------
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
>>>>>>> Stashed changes
  @Delete(":id")
  async deleteBlogById(
    @Param("id") blogId: mongoose.Types.ObjectId,
    @Request() req: any
  ): Promise<string> {
    const userId = req.user.sub;
    try {
      const deletedBlog = await this.blogService.deleteBlogById(blogId);
      return `User Deleted with id ${deletedBlog.id}`;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

<<<<<<< Updated upstream
=======
  // Update Blog------------------------------------------------------------------------------------------------------------------------------------------

  // @UserRoles(UserRole.USER)
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
>>>>>>> Stashed changes
  @Put(":id")
  async updateBlogById(
    @Param("id") blogId: mongoose.Types.ObjectId,
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req: any
  ) {
    const userId = req.user.sub;
    try {
      const existsBlog = await this.blogService.updateById(
        blogId,
        userId,
        updateBlogDto
      );

      return existsBlog;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

<<<<<<< Updated upstream
=======
  //Get Blog------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @UserRoles(UserRole.ADMIN, UserRole.USER, UserRole.VIEWER)
  @ApiOperation({ summary: "GET BLOG", description: "This will Get all blogs" })
  @ApiResponse({ status: 200, description: "Blogs are reterived successfully" })
>>>>>>> Stashed changes
  @Get()
  async getAllBlogs(): Promise<Blog[]> {
    const blogs = await this.blogService.getAllBlogs();
    return blogs;
  }

<<<<<<< Updated upstream
=======
  // Get By Id---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
>>>>>>> Stashed changes
  @Get(":id")
  async getBlogById(
    @Param("id") blogId: mongoose.Types.ObjectId,
    @Request() req: any
  ) {
    const userId = req.user.sub;
    try {
      const findBlogById = await this.blogService.getBlogById(blogId);
      return { findBlogById, userId };
    } catch (err) {
      return new BadRequestException(err);
    }
  }
}
