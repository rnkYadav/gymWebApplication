const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  remark: {
    type: String,
  },
  member_image: {
    type: String,
  },
  active: {
    type: String,
    default: true,
  },
});

module.exports = mongoose.model("Member", MemberSchema);
