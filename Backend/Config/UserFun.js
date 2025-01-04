const User = require("../Models/User");
const create_user = async (req, res) => {
  try {
    const { email_id, password } = req.body;
    const Created = new User({ email_id, password });
    await Created.save();
    return res.status(201).json(Created);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  const { email_id, password } = req.body;
  try {
    const already_user = await User.findOne({ email_id });
    if (already_user) {
      if (already_user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      } else if (already_user.password === password) {
        return res
          .status(200)
          .json({ email_id, password, _id: already_user._id });
      }
    } else if (!already_user) {
      return res.status(404).json({ message: "Sign Up" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports = { create_user, login };
