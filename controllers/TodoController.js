const Todo = require("../models/Todo");
const User = require("../models/User");

exports.createTodo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newTodo = new Todo({
      text: req.body.text,
      user: req.user.id,
      dueDate: req.body.dueDate
    });

    const todo = await newTodo.save();
    return res.status(200).send({
      success: true,
      message: "Todo Saved Sucessfully",
      todo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getAllUserTodo = async (req, res) => {
  try {
    const todos = await Todo.find({user: req.user.id}).sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      todos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getSingleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).send({
      success: true,
      todo,
    });
  } catch (error) {
    console.error(error);
    if (!error.kind === "ObjectId") {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // Check Todo exist
    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }
    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send({
        success: false,
        message: "User not Authorised",
      });
    }
    await todo.remove();
    return res.status(200).send({
      success: true,
      message: "Todo deleted",
    });
  } catch (error) {
    console.error(error);
    if (!error.kind === "ObjectId") {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateTodo = async(req,res)=>{
  try {
    const todo = await Todo.findById({_id:req.params.id});
    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }
    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send({
        success: false,
        message: "User not Authorised",
      });
    }

  
    const updatedTodo = await Todo.updateOne({_id:req.params.id},{$set:req.body});
    return res.status(200).send({
      success: true,
      message: "Todo Updated",
      todo: await Todo.findById({_id:req.params.id})
    });
  } catch (err) {
    if (!error.kind === "ObjectId") {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
}
