const mongoose = require("mongoose");
const { Schema } = mongoose;
var ObjectId = require("mongodb").ObjectId;

const User_Activities_Schema = Schema({
  create_by: { // Người tạo ra hành động
    type: ObjectId,
    required: true,
    ref: "Users"
  },
  user: { 
    type: ObjectId,
    ref: "Users",
    default: null
  },
  post_media: {
    type: ObjectId,
    ref: "Posts_Media",
    default: null
  },
  post_sex: { 
    type: ObjectId,
    ref: "Posts_Sex",
    default: null
  },
  comment: { 
    type: ObjectId,
    ref: "Comments",
    default: null
  },
  review: {
    type: ObjectId,
    ref: "Reviews",
    default: null
  },
  content: {
    type: String,
    default: null
  },
  type:{  // 0: follow, 1: friend_request, 2: friend, 3: xem post, 4: yêu thích post, 5: like , 6: dislike, 8: block user
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

const User_Activities = mongoose.model("User_Activities", User_Activities_Schema, "User_Activities");
module.exports = User_Activities;
