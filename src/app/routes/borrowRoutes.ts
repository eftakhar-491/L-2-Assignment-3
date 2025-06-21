import express, { RequestHandler } from "express";
import { createBorrow, getAllBorrows } from "../controllers/borrowControllers";

const borrowRouter = express.Router();

borrowRouter.post("/", createBorrow as RequestHandler);

borrowRouter.get("/", getAllBorrows as RequestHandler);

export default borrowRouter;
