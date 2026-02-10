import { useState } from "react"; // Added for mobile toggle
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Name */}
        <h1 className="text-2xl font-bold text-purple-600">
          CareerForge Pro
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
          <li><Link to="/about" className="hover:text-purple-600">About</Link></li>
          <li><Link to="/saved-resumes" className="hover:text-purple-600">saved-resumes</Link></li>
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {!user ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-gray-700 font-medium hover:text-purple-600">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center">
              {user?.isPro && (
                <span
                  className="mr-3 px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded"
                  title="Pro User"
                >
                  ⭐ PRO
                </span>
              )}
              <Link to="/payment-success">
                <button className="mr-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Check_PRO_Status
                </button>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 shadow-lg">
          <ul className="space-y-4 font-medium text-gray-700">
            <li><Link to="/" onClick={() => setIsOpen(false)} className="block">Home</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)} className="block">About</Link></li>
            <li><Link to="/saved-resumes" onClick={() => setIsOpen(false)} className="block">saved-resumes</Link></li>
          </ul>
          
          <div className="flex flex-col space-y-3 pt-4 border-t">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-left px-4 py-2 text-gray-700 font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg text-center">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex flex-col space-y-3">
                {user?.isPro && (
                  <span className="w-fit px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded">
                    ⭐ PRO
                  </span>
                )}
                <Link to="/payment-success" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Check_PRO_Status
                  </button>
                </Link>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;