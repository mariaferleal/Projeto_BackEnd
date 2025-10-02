import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  status: String,
  priority: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
});
const Task = mongoose.model("Task", TaskSchema);
export default Task;
