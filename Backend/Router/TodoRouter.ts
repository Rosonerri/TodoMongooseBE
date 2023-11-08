import { Router } from "express";
import { createTodo, viewTodos, viewOneTodo, viewOneAndUpdate, viewOneandDelete } from "../Controller/TodoController";
const router: Router = Router();

router.route("/create-todo").post(createTodo);
router.route("/read-todos").get(viewTodos);
router.route("/read-todo/:todoId").get(viewOneTodo);
router.route("/update-todo/:todoId").patch(viewOneAndUpdate);
router.route("/delete-todo/:todoId").patch(viewOneandDelete);

export default router;
