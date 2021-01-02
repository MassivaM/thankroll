const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Profile", profileSchema);
