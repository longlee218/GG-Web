const mongoose = require("mongoose");
const { Schema } = mongoose;
var ObjectId = require("mongodb").ObjectId;
var Mixed = Schema.Types.Mixed
const Notifications_Schema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  create_by:{
    type: ObjectId,
    ref: "Users",
    default: null
  },
  status:{
    type: Boolean,
    default: true
  }
},{
  timestamps: true
});

const Notifications = mongoose.model("Notifications", Notifications_Schema, "Notifications");
module.exports = Notifications;
