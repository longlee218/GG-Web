const mongoose = require("mongoose");
const { Schema } = mongoose;

var Mixed = Schema.Types.Mixed
const Settings_Schema = Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Mixed ,
    required: true,
  },
  type: {
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true
  }
},{
  timestamps: true
});

const Settings = mongoose.model("Settings", Settings_Schema, "Settings");
module.exports = Settings;
