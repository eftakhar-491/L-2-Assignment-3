import { z } from "zod/v4";
export const ZBook = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string(),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number().min(1, "At least one copy is required"),
  available: z.boolean().default(true).optional(),
});
