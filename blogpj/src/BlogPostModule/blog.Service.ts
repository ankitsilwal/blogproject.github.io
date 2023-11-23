import { Injectable, NotFoundException } from "@nestjs/common";
import { Blog } from "./blog.Schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateBlogDto } from "./BlogDTO/CreateBlog.Dto";
import mongoose from "mongoose";
import { UpdateBlogDto } from "./BlogDTO/UpdateBlog.Dto";
@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(
    blogId: string,
    createBlogDto: CreateBlogDto
  ): Promise<Blog> {
    const blog = await this.blogModel.create({
      ...createBlogDto,
      author: new mongoose.Types.ObjectId(blogId),
    });
    return blog;
  }

  async deleteBlogById(blogId: mongoose.Types.ObjectId): Promise<Blog> {
    const deleteBlogById = await this.blogModel.findByIdAndDelete(blogId);
    if (!deleteBlogById) {
      throw new NotFoundException(`User with #${blogId} not found`);
    }
    return deleteBlogById;
  }

  async updateById(
    blogId: mongoose.Types.ObjectId,
    updateBlogDto: UpdateBlogDto
  ): Promise<Blog> {
    const existsBlog = await this.blogModel.findByIdAndUpdate(
      blogId,
      updateBlogDto,
      { new: true }
    );
    if (!existsBlog) {
      throw new NotFoundException(`User with #${blogId} not found`);
    }
    return existsBlog;
  }

  async getAllBlogs(): Promise<Blog[]> {
    const blogs = await this.blogModel
      .find()
      .populate("author", { Password: 0 });
    return blogs;
  }

  async getBlogById(blogId: mongoose.Types.ObjectId): Promise<Blog> {
    const getBlogById = await this.blogModel.findById(blogId).populate("author", { Password: 0 });
    if (!getBlogById) {
      throw new NotFoundException(`User with #${blogId} not Found`);
    }
    return getBlogById;
  }
}
