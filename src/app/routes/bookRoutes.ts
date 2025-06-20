import express, { RequestHandler } from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBookById,
  updateBook,
} from "../controllers/bookController";

const bookRouter = express.Router();

bookRouter.post("/", createBook as RequestHandler);
bookRouter.get("/", getBook as RequestHandler);
bookRouter.get("/:bookId", getBookById as RequestHandler);
bookRouter.put("/:bookId", updateBook as RequestHandler);
bookRouter.delete("/:bookId", deleteBook as RequestHandler);

export default bookRouter;
