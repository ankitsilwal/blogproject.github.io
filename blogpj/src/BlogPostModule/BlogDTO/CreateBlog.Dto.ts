import {IsNotEmpty} from "@nestjs/class-validator";
import mongoose from "mongoose";

export class CreateBlogDto{
    
    id:mongoose.Types.ObjectId;
    
    blogname : String;

    author : mongoose.Types.ObjectId;
    
    genre : String;
    
    description : String;
    
    problem : String;
    
    summary : String;
}