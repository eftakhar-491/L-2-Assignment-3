export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  updateAvailability: (quantity: number) => void;
  // updateAvailabilityOnCopies: (quantity: number) => void;
  createdAt?: Date;
  updatedAt?: Date;
}
