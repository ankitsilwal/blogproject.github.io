import mongoose from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "./dto/createUserDto";

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class User {
  id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  Username: string;

  @Prop({ required: true })
  Password: string;

  @Prop({ required: true })
  Role: UserRole;

  @Prop()
  PNumber: number;
}

export const UserDocument = User && Document;
export const UserSchema = SchemaFactory.createForClass(User);
