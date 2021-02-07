const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const thankingSchema = new Schema(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: false,
    },
    contactName: {
      type: String,
      required: false,
    },
    shareEmail: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Thanking", thankingSchema);
