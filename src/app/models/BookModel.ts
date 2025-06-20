import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/IBook";

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    copies: {
      type: Number,
      required: true,
      min: [1, "At least one copy is required"],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
BookSchema.methods.updateAvailability = function () {
  if (this.copies <= 0) {
    this.available = false;
  }
};
export const Book = model("Book", BookSchema);
