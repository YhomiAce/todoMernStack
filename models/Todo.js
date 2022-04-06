const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    required: true
  },
}, { timestamps: true });

module.exports = Todo = mongoose.model("todo", TodoSchema);
