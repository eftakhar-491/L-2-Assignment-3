import mongoose from "mongoose";
import { z } from "zod/v4";
export const ZBorrow = z.object({
  book: z
    .string({
      message: "Book ID is required",
    })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Book ID",
    }),
  quantity: z.number().min(1, "Quantity must be at least 1 eftaaaaaaaaaaa"),
  dueDate: z
    .string()
    .transform((val) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) throw new Error("Invalid date format");
      return date;
    })
    .refine((date) => date > new Date(), {
      message: "Due date must be in the future",
    })
    .transform((date) => date.toISOString()),
});
