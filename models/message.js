const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
  userID:String,
  messages:Number
}
);

module.exports = mongoose.model("messages",messageSchema);
