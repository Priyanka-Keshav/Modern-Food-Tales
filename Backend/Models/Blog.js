const mongoose = require("mongoose");
const { Schema } = mongoose;
const BlogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
const Food_Blog = mongoose.model("Food_Blog", BlogSchema);
module.exports = Food_Blog;
