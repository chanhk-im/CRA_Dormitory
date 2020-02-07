var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    post: { type: String, required: true },

    stars: [new mongoose.Schema({ user_id: String })],
    comments: [new mongoose.Schema({ author: String, comment: String }, { _id: false })],

    published_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("post", postSchema);
