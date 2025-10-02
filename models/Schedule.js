import mongoose from "mongoose";
const ScheduleSchema = new mongoose.Schema({
  name: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sharedWith: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
  ],
  isTeamSchedule: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

class ScheduleClass {
  static async createSchedule(data) {
    return this.create(data);
  }
}

ScheduleSchema.loadClass(ScheduleClass);
export default mongoose.model("Schedule", ScheduleSchema);
