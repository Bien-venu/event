import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IAdmin extends Document {
  email: string;
  username: string; 
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.Admin ||
  mongoose.model<IAdmin>("Admin", adminSchema);
