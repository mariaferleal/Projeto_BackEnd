import mongoose from "mongoose";
const PreferencesSchema = new mongoose.Schema({
  timeozne: String,
  language: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: {
    type: String, enum: ['user', 'admin']
  },
  preferences: PreferencesSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

class UserClass {
  static async createUser(data) {
    return this.create(data);
  }

  static async findByName(name) {
    return this.findOne({ name });
  }
}

UserSchema.loadClass(UserClass);
const User = mongoose.model("User", UserSchema);
export default User;
