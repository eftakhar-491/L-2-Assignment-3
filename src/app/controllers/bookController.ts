import { Request, Response } from "express";

import { Book } from "../models/BookModel";
import { ZBook } from "../Validetor/bookValidetor";

export const createBook = async (req: Request, res: Response) => {
  try {
    // const data = await Book.create(body);
    const insBook = new Book(req.body);
    const data = await insBook.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || "Server Error",
      success: false,
      error: {
        name: error?.name || "Server Error",
        error,
      },
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
      message: error?.message?.toString() || "Server Error",
      success: false,
      error: {
        name: error?.name || "Server Error",
        error,
      },
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    const data = await Book.findById(bookId);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message?.toString() || "Server Error",
      success: false,
      error: {
        name: error?.name || "Server Error",
        error,
      },
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const ZBookUpdate = ZBook.partial().strict();

    const body = await ZBookUpdate.parseAsync(req.body);

    const currentBook = await Book.findById(bookId);

    body.copies = (currentBook?.copies ?? 0) + (body?.copies ?? 0);

    if (body.copies > 0) {
      body.available = true;
    } else {
      body.available = false;
    }

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
      message: error?.message?.toString() || "Server Error",
      success: false,
      error: {
        name: error?.name || "Server Error",
        error,
      },
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
      message: error?.message?.toString() || "Server Error",
      success: false,
      error: {
        name: error?.name || "Server Error",
        error,
      },
    });
  }
};
