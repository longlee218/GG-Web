const mongoose = require("mongoose");
const { Schema } = mongoose;

const Categorys_Schema = Schema({
  url:{
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type:{  // 0 : danh mục cho post video , 1: post ảnh , 2: post truyện
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true
});

const Categorys = mongoose.model("Categorys", Categorys_Schema, "Categorys");
module.exports = Categorys;
