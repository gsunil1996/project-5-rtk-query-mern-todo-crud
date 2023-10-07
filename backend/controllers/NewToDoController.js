const NewToDoModel = require("../models/NewToDoModel");

module.exports.getToDo = async (req, res) => {
  try {
    const todo = await NewToDoModel.find().lean().exec();
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports.getToDoById = async (req, res) => {
  try {
    const todo = await NewToDoModel.findById(req.params.id).lean().exec();
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;

  try {
    const todo = await NewToDoModel.create({ text, status: false });
    console.log("Added Successfully...");
    console.log(todo);
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports.deleteToDo = async (req, res) => {
  console.log("id ---> ", req.params.id);

  try {
    const todo = await NewToDoModel.findByIdAndDelete(req.params.id).lean();
    console.log("Deleted Successfully...");
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports.updateToDo = async (req, res) => {
  const { id } = req.params;
  const { text, status } = req.body;

  try {
    const todoUpdate = await NewToDoModel.findByIdAndUpdate(
      { _id: id },
      { text, status },
      {
        new: true,
      }
    );
    await todoUpdate.save();
    res.status(200).json(todoUpdate);
    console.log("Updated Successfully...");
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// chnage status
exports.changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const todoStatusUpdate = await NewToDoModel.findByIdAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
    res.status(200).json(todoStatusUpdate);
  } catch (error) {
    res.status(401).json(error);
  }
};
