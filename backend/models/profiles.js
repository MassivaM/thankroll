const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
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
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  accept: {
    type: Boolean,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Profile", profileSchema);
