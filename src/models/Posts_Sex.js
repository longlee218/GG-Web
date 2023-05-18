const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

var ObjectId = require("mongodb").ObjectId;
const Posts_Sex_Schema = Schema({
  id:{ // Mã số cho url
    type: Number,
    unique: true
  },
  type: { // 0: Gái gọi, 1: Chat sex
    type: Number,
    default: 0
  },
  verify_code:{
    type: String,
    required: true,
  },
  verify_code_update_date:{
    type: Date,
    required: true,
    default: new Date()
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
  title: { // Tên bài đăng
    type: String,
    required: true,
  },
  img_privacy_list:{ // Ảnh rõ mặt chụp kèm mã xác thực verify_code
    type: Array,
    default:[],
    required: true
  },
  img_list:{
    type: Array,
    default:[],
    required: true
  },
  img_cover:{
    type:String, 
    required: true
  },
  video:{
    type: String,
    default: null
  },
  price:{
    type: Number,
    default: 0,
    required: true,
  },
  room_price:{ // giá phòng , chỉ dùng cho gái gọi
    type: Number,
    default: 0,
    required: true,
  },
  phone:{
    type: Number,
    default: null,
    required: true,
  },
  zalo:{
    type: Number,
    default: null,
  },
  pass:{ // pass gái gọi
    type: String,
    default: "Liên hệ",
  },
  year_of_birth:{ // năm sinh
    type: Number,
    default: null,
  },
  hight:{
    type: Number,
    default: null,
  },
  weight:{
    type: Number,
    default: null,
  },
  body:{ // Số đo 3v
    type: String,
    default: null,
  },
  born:{ // Xuất xứ
    type: String,
    default: null,
  },
  address:{ // Chỉ dùng cho gái gọi
    type: Number,
    default: null,
  },
  work_time:{ // Thời gian làm việc
    type: String, 
    default: null,
  },
  service_time:{ // Thời gian phục vụ
    type: Number, 
    default: 0,
    required: true
  },
  services:[
    {
      type: ObjectId,
      ref: 'Services', 
    }
  ],
  guaranteed:{ // Cam kết
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
  review_point:{ // Điểm đánh giá
    type: Number,
    default: 0
  },
  review_count:{ // Số đánh giá
    type: Number,
    default: 0
  },
  content:{ // Nội dung
    type: String,
    default: null
  },
  is_hot:{ // upppp bài
    type:Boolean,
    default: false
  },
  auto_renew:{
    type: Boolean,
    default: false
  },
  expired:{ // Ngày hết hạn
    type: Date,
    required: true,
    default: new Date()
  },
  expired_sub:{ // Thời gian còn lại nếu account tạm dừng để phê duyệt(tính bằng giây)
    type: Number,
    default: 0
  },
  is_approve:{ // false: Chưa duyệt / true: Đã duyệt 
    type: Boolean,
    default: false
  },
  status:{ // 0: Hết hạn, 1: Hoạt động, 2: Tạm vắng (ko trừ thời gian), 3: Khóa(Trừ hết thời gian)
    type: Number,
    default: 0
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
Posts_Sex_Schema.plugin(AutoIncrement, { inc_field: "id", start_seq:2241 });
const Posts_Sex = mongoose.model("Posts_Sex", Posts_Sex_Schema, "Posts_Sex");
module.exports = Posts_Sex;
