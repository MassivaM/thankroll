const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdProfiles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
