const Message = require("../models/Message");
const User = require("../models/User");

exports.getNew = (req, res) => {
  res.render("msg_create");
};

exports.postNew = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const message = new Message({
      title: title,
      content: content,
      author: userId,
      post_date: Date.now(),
    });
    await message.save();
    req.flash("success", "Message Sent");
    res.redirect("/msg/write");
  } catch (error) {
    next(error);
  }
};


