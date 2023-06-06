const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    moviename:{type:String, required: true},
    category:{type:String, required: true},
    actors:[{type:mongoose.Schema.Types.ObjectId, ref:"users"}]
})

const movie = mongoose.model("movies", movieSchema);

module.exports = movie;