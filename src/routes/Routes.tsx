import App from "@/App";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import BookDetails from "@/pages/BookDetails";
import BorrowSummary from "@/pages/BorrowSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: AllBooks
      },
      {
        path: "/books",
        Component: AllBooks
      },
      {
        path: "/books/:id",
        Component: BookDetails
      },
      {
        path: "/create-book",
        Component: AddBook
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary
      },
    ]
  },

]);

export default router;