const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

var ObjectId = require("mongodb").ObjectId;
const Posts_Media_Schema = Schema({
  id:{ // Mã số cho dễ đọc chứ bth vẫn dùng _id
    type: Number,
    unique: true
  },
  title: { // Tên bài đăng
    type: String,
    required: true,
  },
  url: { // url
    type: String,
    required: true,
  },
  type:{
    type: Number,
    required: true // 0 : video , 1: ảnh , 2: truyện
  },
  categorys:{
    type: ObjectId,
    ref: "Categorys",
    default: null // Thể loại khác
  },
  video_list:{
    type: Array,
    default: []
  },
  img_list:{
    type: Array,
    default: []
  },
  author:{
    type: ObjectId,
    ref: "Users",
    default: null
  },
  view:{
    type: Number,
    default: 0
  },
  description:{ // Mô tả
    type: String,
    default: null
  },
  content:{ // Nội dung
    type: String,
    default: null
  },
  status:{ // Duyệt / Chưa duyệt
    type: Boolean,
    default: false
  },
  note:{ // ghi chú lý do chưa duyệt...etc
    type: String,
    default:null
  },
  tags:{
    type: String,
    default: null
  },
},{
  timestamps: true
});
Posts_Media_Schema.plugin(AutoIncrement, { inc_field: "id", start_seq:2241 });
const Posts_Media = mongoose.model("Posts_Media", Posts_Media_Schema, "Posts_Media");
module.exports = Posts_Media;
