const { Router } = require("express");

const { getToDo, getToDoById, saveToDo, deleteToDo, updateToDo, changeStatus } = require("../controllers/ToDoController");

const router = Router();

router.get("/", getToDo);

router.get("/todo/:id", getToDoById);

router.post("/save", saveToDo);

router.put("/update/:id", updateToDo);

router.put("/status/:id", changeStatus)

router.delete("/delete/:id", deleteToDo);

module.exports = router;