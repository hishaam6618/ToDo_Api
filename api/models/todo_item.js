const mongoose = require("mongoose");
const toDoItemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, require: true },
  description: { type: String, require: true },
  date: { type: Date, require: true },
  stautus: { type: String, default: "pending" },
});

module.exports = mongoose.model("ToDoItem", toDoItemSchema);
