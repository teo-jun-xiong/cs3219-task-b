const mongoose = require("mongoose");
var autoIncrement = require("mongoose-sequence")(mongoose);

const ModSchema = mongoose.Schema(
  {
    _id: Number,
    name: String,
    code: String,
    grade: String,
  },
  {
    timestamps: true,
  }
);

ModSchema.plugin(autoIncrement, { id: "order_seq", inc_field: "_id" });
module.exports = mongoose.model("Mod", ModSchema);
