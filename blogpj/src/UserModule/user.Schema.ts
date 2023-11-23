import mongoose from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
<<<<<<< Updated upstream
=======
import { UserRole } from "../AuthModule/Dto/createUserDto";
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  @Prop({ required: true })
  Username: string;
=======
  @Prop({ required: true, unique: true })
  username: string;
>>>>>>> Stashed changes

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  Role: string;

  @Prop({ required: true })
<<<<<<< Updated upstream
  PNumber: number;
=======
  pnumber: number;
>>>>>>> Stashed changes
}

export const UserDocument = User && Document;
export const UserSchema = SchemaFactory.createForClass(User);
