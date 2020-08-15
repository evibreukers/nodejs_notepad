const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const folderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: Number,
    },
    notes: {
      type: Array,
    },
  },
  { timestamps: true }
);

// 1st argument is collection name, 2nd argument is schema name
const Song = mongoose.model("Folders", folderSchema);
module.exports = Song;
