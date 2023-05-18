const mongoose = require("mongoose");
const { Schema } = mongoose;
var ObjectId = require("mongodb").ObjectId;
const Deposits_Schema = Schema({
  e_voucher:{ // Mã PM Evoucher
    type: String,
    required: true,
    unique: true
  },
  active_code:{ // Mã PM Active
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: "Users",
    required: true
  },
  approve_user: { // người phê duyệt
    type: ObjectId,
    ref: "Users"
  },
  approve_date: {
    type: Date,
    default: null
  },
  approve_type: { // 0: Tự động , 1: Manual
    type: Number,
    default: null
  },
  amount_pm: {  // Số lượng PM nạp vào
    type:Number,
    required: true,
  },
  amount_balance: {  // Balance quy đổi từ PM tại thời điểm nạp
    type:Number,
    required: true,
  },
  log: {
    type: [],
    default: null
  },
  status: {
    type: Number, // 0 đợi phê duyệt / đã phê duyệt / đã hủy
    required: true,
    default: false
  },
},{
  timestamps: true
});

const Deposits = mongoose.model("Deposits", Deposits_Schema, "Deposits");
module.exports = Deposits;
