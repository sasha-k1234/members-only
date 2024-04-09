const Message = require("../models/Message");
const User = require("../models/User");

exports.getNew = (req, res) => {
  res.render("msg_create");
};

exports.postNew = async (req, res, next) => {
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
    req.flash("error", "Error occured while sending message ");
    next(error);
  }
};

exports.msgBoard = async (req, res, next) => {
  try {
    const messages = await Message.find({}).populate("author");
    res.render("message_board", { messages });
  } catch (err) {
    next(err);
  }
};


exports.delMsg = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Message.findByIdAndDelete(id);
    res.redirect('/msg/board');
  } catch (err) {
    next(err);
  }
};
