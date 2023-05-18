const mongoose = require("mongoose");
const { Schema } = mongoose;
var ObjectId = require("mongodb").ObjectId;

const Comments_Schema = Schema({
  post: {
    type: ObjectId,
    required: true
  },
  type:{ // 0 : cho post_media, 1: cho post_sex, 2: cho review
    type: Number, 
    required: true
  },
  reply_from: {
    type: ObjectId,
    ref: "Comments",
    default: null
  },
  content:{
    type: String,
    required: true,
  },
  img_list:{
    type: Array,
    default:[],
  },
  status:{ // Ẩn / Hiện
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

const Comments = mongoose.model("Comments", Comments_Schema, "Comments");
module.exports = Comments;