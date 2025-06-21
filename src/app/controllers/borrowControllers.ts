import { Request, Response } from "express";
import { Borrow } from "../models/BorrowModel";
import { Book } from "../models/BookModel";
import { ZBorrow } from "../Validetor/borrowValidetor";

export const createBorrow = async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;

  try {
    const parseData = ZBorrow.parseAsync(req.body);
    console.log(await parseData);

    const bookData = await Book.findById(book);
    if (!bookData) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    if (!bookData.available || bookData.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available",
        data: null,
      });
    }

    (bookData as any).updateAvailability(quantity);
    await bookData.save();

    const borrowRecord = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Borrow record created successfully",
      data: borrowRecord,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to post borrow record",
      data: error,
    });
  }
};

export const getAllBorrows = async (req: Request, res: Response) => {
  try {
    console.log(req?.query);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve borrow records",
      data: null,
    });
  }
};
