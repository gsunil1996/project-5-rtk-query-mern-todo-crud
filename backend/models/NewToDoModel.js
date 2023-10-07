const mongoose = require("mongoose");

const newTodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("newlisttodos", newTodoSchema);
