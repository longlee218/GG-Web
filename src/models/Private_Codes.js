const mongoose = require("mongoose");
const { Schema } = mongoose;
var ObjectId = require("mongodb").ObjectId;

const Private_Codes_Schema = Schema({ // Mã code prive để chụp ảnh kèm mặt, để verify gái gọi
  user: {
    type: ObjectId,
    required: true,
    ref: "Users"
  },
  post: {
    type: ObjectId,
    required: true,
    ref: "Posts_Sex"
  },
  code: {
    type: String,
    required: true,
    unique:true
  }
}, {
  timestamps: true
});
const Private_Codes = mongoose.model("Private_Codes", Private_Codes_Schema, "Private_Codes");
module.exports = Private_Codes;
