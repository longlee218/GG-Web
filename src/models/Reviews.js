const mongoose = require("mongoose");
const { Schema } = mongoose;
var ObjectId = require("mongodb").ObjectId;

const Tags_Schema = Schema({
  post_id: {
    type: ObjectId,
    required: true
  },
  review_point: { // Điểm đánh giá
    type: Number,
    default: 1,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img_list: {
    type: Array,
    default: [],
  },
  is_hot: { // nổi lên top
    type: Boolean,
    default: false,
  },
  status: { // Phê duyệt hoặc chưa
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

const Tags = mongoose.model("Tags", Tags_Schema, "Tags");
module.exports = Tags;