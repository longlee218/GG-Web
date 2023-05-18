const mongoose = require("mongoose");
const { Schema } = mongoose;
var ObjectId = require("mongodb").ObjectId;
const Locations_Schema = Schema({
  status:{
    type: Boolean,
    default: false,
  },
  name:{
    type: String,
    required: true,
  },
  parent:{
    type: ObjectId,
    required: true,
    ref: "Locations"
  }
}, {
  timestamps: true
});

const Locations = mongoose.model("Locations", Locations_Schema, "Locations");
module.exports = Locations;