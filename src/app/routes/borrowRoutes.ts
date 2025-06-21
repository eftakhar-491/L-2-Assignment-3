import express, { RequestHandler } from "express";
import { createBorrow } from "../controllers/borrowControllers";

const borrowRouter = express.Router();

borrowRouter.post("/", createBorrow as RequestHandler);

export default borrowRouter;
