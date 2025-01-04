const Food_Blog = require("../Models/Blog");

//creation of a blog
const create_Blog = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, image, userId } =
      req.body; // Add image here

    const newBlog = new Food_Blog({
      title,
      description,
      ingredients,
      instructions,
      image,
      user: userId,
    });

    await newBlog.save();
    return res.status(201).json(newBlog); // Use 201 Created instead of 401
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//getting all blog
const get_Blog = async (req, res) => {
  try {
    const get_all = await Food_Blog.find({});
    res.json(get_all);
  } catch (error) {
    console.log("not getting value");
  }
};
//getting user blog
const get_user_blog = async (req, res) => {
  try {
    const userId = req.params.id;
    const get_all = await Food_Blog.find({ user: userId });
    res.json(get_all);
  } catch (error) {
    console.log("not getting value");
  }
};
//getting particularblog
const get_one = async (req, res) => {
  try {
    const getBlog_id = await Food_Blog.findById(req.params.id);
    res.json(getBlog_id);
  } catch (error) {
    console.log(error);
  }
};
//to delete a particular element
const delete_blog = async (req, res) => {
  try {
    const user = await Food_Blog.findByIdAndDelete(req.params.id);
    Food_Blog.save();
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
};
//to update particular
const update_blog = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, image } = req.body;
    const updatedBlog = await Food_Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, ingredients, instructions, image },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create_Blog,
  get_Blog,
  get_one,
  delete_blog,
  update_blog,
  get_user_blog,
};
