import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUSer extends Document {
  email: string;
  name: string;
  password: string;
  phoneNo: string;
  books: mongoose.Types.ObjectId[],
  isLogin: boolean
}

const userSchema: Schema<IUSer> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true, unique: true },
    books: [{ type: Types.ObjectId, ref: "books" }],
    isLogin: {type: Boolean, default: false}
  },
  { timestamps: true }
);

export const userModel = mongoose.model<IUSer>("users", userSchema);