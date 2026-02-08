import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-purple-600">
          ResumeCraft
        </h1>

        {/* Links */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {/* Buttons */}
        <div className="space-x-3">
        <Link to="/login">
          <button  className="px-4 py-2 text-gray-700 font-medium">
            Login
          </button>
          </Link>
          <Link to="/register">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Sign Up
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
