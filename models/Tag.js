import mongoose from "mongoose";
const TagSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  name: String
})

class TagClass {
  static async createTag(data) {
    return this.create(data);
  }
}

TagSchema.loadClass(TagClass);
export default mongoose.model("Tag", TagSchema);
