const mongoose = require("mongoose");
const { Schema } = mongoose;
var ObjectId = require("mongodb").ObjectId;
const Payments_Schema = Schema({
  create_by: { 
    type: ObjectId,
    required: true,
    ref: "Users"
  },
  user: { 
    type: ObjectId,
    ref: "Users",
    default: null
  },
  post: {
    type: ObjectId,
    ref: "Posts_Sex",
    default: null
  },
  deposit: {
    type: ObjectId,
    ref: "Deposits",
    default: null
  },
  type: { // 0: Nạp, 1: Gia hạn, 2: Tặng điểm
    type: Number,
    default: null
  },
  day:{ // Số ngày gia hạn
    type: Number,
    default: null
  },
  point:{ // Số điểm bị trừ/cộng
    type: Number,
    required: true,
    default: 0
  },
 
  current_point:{ // Số điểm tại thời điểm gia hạn
    type: Number,
    required: true,
    default: 0
  },
  
},{
  timestamps: true
});

const Payments = mongoose.model("Payments", Payments_Schema, "Payments");
module.exports = Payments;
