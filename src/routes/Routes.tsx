import App from "@/App";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/allBook",
        Component: AllBooks
      },
      {
        path: "/addBook",
        Component: AddBook
      },
      {
        path: "/borrowSummary",
        Component: BorrowSummary
      },
    ]
  },

]);

export default router;