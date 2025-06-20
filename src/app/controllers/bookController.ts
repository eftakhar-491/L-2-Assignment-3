import { Request, Response } from "express";

import { Book } from "../models/BookModel";
import { ZBook } from "../Validetor/bookValidetor";

export const createBook = async (req: Request, res: Response) => {
  try {
    const body = await ZBook.parseAsync(req.body);
    const data = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message || "Failed to create book",
      data: null,
    });
  }
};
export const getBook = async (req: Request, res: Response) => {
  const { filter, sortBy = "createdAt", sort = "desc", limit = 10 } = req.query;
  const sortOrder = sort === "asc" ? 1 : -1;
  const resultLimit = parseInt(limit as string);

  try {
    let query = Book.find(filter ? { genre: filter } : {}).sort({
      [sortBy as string]: sortOrder,
    });

    if (!isNaN(resultLimit) && resultLimit > 0) {
      query = query.limit(resultLimit);
    }
    const data = await query;

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message || "Failed to retrieved books",
      data: null,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  console.log(typeof bookId);

  try {
    // Validate bookId as a valid ObjectId
    const data = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message || "Failed to retrieve book by ID",
      data: null,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const ZBookUpdate = ZBook.partial().strict();

    const body = await ZBookUpdate.parseAsync(req.body);
    console.log(body);
    const data = await Book.findByIdAndUpdate(bookId, body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message || "Failed to update book",
      data: null,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message || "Failed to delete book",
      data: null,
    });
  }
};
