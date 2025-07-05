import { Link, NavLink } from "react-router";
import logo from "../../assets/icons8-books-48.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = (
        <>
            <NavLink
                to="/books"
                className={({ isActive }) =>
                    `${isActive ? "underline underline-offset-2 text-blue-600 font-semibold" : ""} hover:underline underline-offset-2`
                }
            >
                All Books
            </NavLink>
            <NavLink
                to="/create-book"
                className={({ isActive }) =>
                    `${isActive ? "underline underline-offset-2 text-blue-600 font-semibold" : ""} hover:underline underline-offset-2`
                }
            >
                Add Book
            </NavLink>
            <NavLink
                to="/borrow-summary"
                className={({ isActive }) =>
                    `${isActive ? "underline underline-offset-2 text-blue-600 font-semibold" : ""} hover:underline underline-offset-2`
                }
            >
                Borrow Summary
            </NavLink>
        </>
    );

    return (
        <nav className="border-b shadow-sm px-5">
            <div className="container mx-auto h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-xl font-semibold flex items-center gap-2">
                    <img src={logo} alt="logo" className="h-8 w-8" />
                    Library Management
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-6 items-center">
                    {navLinks}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden flex flex-col gap-3 px-5 pb-4">
                    {navLinks}
                </div>
            )}
        </nav>
    );
};

export default Navbar;