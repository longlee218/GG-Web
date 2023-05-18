const mongoose = require("mongoose");
const { Schema } = mongoose;
const Tags_Schema = Schema({ // Khi nào duyệt bài oke thì add tag trong bài post vào đây
  name:{
    type: String,
    required: true,
  },
  _name:{ // tag tiếng việt ko dấu
    type: String,
    required: true,
  },
  search_count: { // Số lần tìm kiếm
    type: Number,
    default: 0
  },
  status:{ // Ẩn/ hiện
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

const Tags = mongoose.model("Tags", Tags_Schema, "Tags");
module.exports = Tags;