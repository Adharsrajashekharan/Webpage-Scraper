let mongoose = require("mongoose");

let urlSchema = new mongoose.Schema({

  domain: {
    type: String,
  },
  wordCount: Number,
  mediaUrls:Array,
  favourites:Boolean,
  webLinks:Array

});

module.exports = mongoose.model("data", urlSchema);
