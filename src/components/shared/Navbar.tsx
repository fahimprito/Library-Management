import logo from "../../assets/icons8-books-48.png"

const Navbar = () => {
    return (
        <nav className="max-w-7xl mx-auto h-16 flex items-center gap-3 px-5 border">
            <div className="text-xl flex items-center font-semibold">
                <img src={logo} alt="" />
                Library Management
            </div>
        </nav>
    );
};

export default Navbar;