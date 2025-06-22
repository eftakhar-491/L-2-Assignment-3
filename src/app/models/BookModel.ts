import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/IBook";
import { ZBook } from "../Validetor/bookValidetor";

export const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true, // MongoDB handles unique error separately (duplicate key error)
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Copies count is required"],
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BookSchema.methods.updateAvailability = function (quantity: number) {
  this.copies -= quantity;
  if (this.copies <= 0) {
    this.available = false;
  }
};
BookSchema.pre("save", async function (next) {
  try {
    const obj = this.toObject();
    await ZBook.parseAsync(obj);
    next();
  } catch (error: any) {
    next(error);
  }
});

export const Book = model("Book", BookSchema);
