import { Link, NavLink } from "react-router";
import logo from "../../assets/icons8-books-48.png"

const Navbar = () => {
    return (
        <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-3 px-5 border">
            <Link to={"/"} className="text-xl flex items-center font-semibold mr-auto">
                <img src={logo} alt="" />
                Library Management
            </Link>
            <NavLink to={"/books"}
                className={({ isActive }) => `${isActive ? "underline underline-offset-2" : ""} hover:underline underline-offset-2`}>
                All Book
            </NavLink>
            <NavLink
                to={"/create-book"}
                className={({ isActive }) => `${isActive ? "underline underline-offset-2" : ""} hover:underline underline-offset-2`}>
                Add Book
            </NavLink>
            <NavLink to={"/borrow-summary"}
                className={({ isActive }) => `${isActive ? "underline underline-offset-2" : ""} hover:underline underline-offset-2`}>
                Borrow Summary
            </NavLink>
        </nav>
    );
};

export default Navbar;