const mongoose = require("mongoose");
const { Schema } = mongoose;
var ObjectId = require("mongodb").ObjectId;

const Users_Schema = Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number, // 0: admin // 1: quản trị viên / 2: user / 3: nhà cung cấp
    required: true,
    default: 2
  },
  balance: {
    type: Number,
    default: 0,
  },
  balance_deposit: { // Tổng tiền nạp
    type: Number,
    default: 0,
  },
  status:{
    type: Boolean,
    required: true,
    default:true
  },
  email: {
    type:String,
    required:true
  },
  phone: {
    type:String,
    default: null
  },
  telegram_group: {
    type: String,
    default: null
  },
  telegram_channel: {
    type: String,
    default: null
  },
  telegram: {
    type: String,
    default: null
  },
  sex: {
    type:String,
    default: "Nam"
  },
  year_of_birth: {
    type:Number,
    default: null
  },
  location_province:{ // Tỉnh/ thành phố
    type: ObjectId,
    required: true,
    ref: "Locations"
  },
  location_district:{ // Quận / huyện
    type: ObjectId,
    required: true,
    ref: "Locations"
  },
  last_login:{
    type: Date,
    default: new Date(),
  },
  ip_web: {
    type: String,
  },
  ip_mobile: {
    type: String,
  },
  code_web:{
    type: String,
  },
  code_mobile:{
    type: String,
  },
  
}, {
  timestamps: true
});

const Users = mongoose.model("Users", Users_Schema, "Users");
module.exports = Users;
