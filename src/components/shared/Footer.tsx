
const Footer = () => {
    return (
        <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-10 border-t">
            <p>
                &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
            </p>
            <p className="mt-1">
                Developed by <a href="https://github.com/fahimprito" className="text-blue-600 hover:underline">Fahim Prito</a>
            </p>
        </footer>
    );
};

export default Footer;
