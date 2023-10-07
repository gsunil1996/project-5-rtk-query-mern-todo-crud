const { Router } = require("express");

const {
  getToDo,
  getToDoById,
  saveToDo,
  deleteToDo,
  updateToDo,
  changeStatus,
} = require("../controllers/NewToDoController");

const router = Router();

router.get("/newTodo", getToDo);

router.get("/newTodo/todo/:id", getToDoById);

router.post("/newTodo/save", saveToDo);

router.put("/newTodo/update/:id", updateToDo);

router.put("/newTodo/status/:id", changeStatus);

router.delete("/newTodo/delete/:id", deleteToDo);

module.exports = router;
