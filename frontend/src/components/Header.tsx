import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-blue-50 shadow-sm">
      <div className="flex items-center space-x-2">
        {/* O bg-clip-text recorta o fundo para q ele fique no formato */}
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-400 text-2xl font-bold">
          TravelWise
        </h1>
      </div>
      <nav className="flex items-center space-x-4">
        <Link
          to="/?????"
          className="text-gray-800 font-medium px-4 py-1.5 rounded-md hover:bg-yellow-500 transition ease-in-out"
        >
          About
        </Link>
        <Link
          to="/???"
          className="text-gray-800 font-medium px-4 py-1.5 rounded-md hover:bg-yellow-500 transition ease-in-out"
        >
          Features
        </Link>
        <Link
          to="/authenticate"
          className="border border-gray-300 px-4 py-1.5 rounded-md text-gray-800 hover:bg-yellow-500 transition"
        >
          Login / Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Header;
