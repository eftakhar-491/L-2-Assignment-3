import { Request, Response } from "express";
import { Borrow } from "../models/BorrowModel";
import { Book } from "../models/BookModel";
import { ZBorrow } from "../Validetor/borrowValidetor";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = await ZBorrow.parseAsync(req.body);

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
      message: error?.message?.toString() || "Server Error",
      success: false,
      error: {
        name: error?.name || "Server Error",
        error,
      },
    });
  }
};

export const getAllBorrows = async (_: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      {
        $addFields: {
          bookID: { $toObjectId: "$book" },
        },
      },
      {
        $group: {
          _id: "$bookID",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          _id: 0,
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message || "Server error",
      data: null,
    });
  }
};
