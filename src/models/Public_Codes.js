const mongoose = require("mongoose");
const { Schema } = mongoose;

const Public_Codes_Schema = Schema({ // Mã code pulbic để chụp bộ ảnh mẫu theo tháng/năm
  month_year:{ // Tháng năm
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique:true
  }
}, {
  timestamps: true
});
const Public_Codes = mongoose.model("Public_Codes", Public_Codes_Schema, "Public_Codes");
module.exports = Public_Codes;
