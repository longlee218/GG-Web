const mongoose = require("mongoose");
const { Schema } = mongoose;

const Services_Schema = Schema({
  name: {
    type: String,
    required: true
  },
  type: {  // 0 : danh mục cho post sex , 1: danh mục cho post chat
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

const Services = mongoose.model("Services", Services_Schema, "Services");
module.exports = Services;
