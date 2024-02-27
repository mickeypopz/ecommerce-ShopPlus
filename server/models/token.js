const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

tokenSchema.pre("save", function (next) {
  // Delete any tokens that are older than 1 minutes
  Token.findOneAndDelete(
    {
      timestamp: { $lt: moment().subtract(1, "week").toDate() },
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  next();
});

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
