import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ThemeToggle } from ".";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            FeeManager
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `font-medium transition-all duration-200 relative group ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                }`
              }
            >
              All Students
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full bg-blue-600 dark:bg-blue-400 transition-all duration-300"></span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `font-medium transition-all duration-200 relative group ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                }`
              }
            >
              Profile
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full bg-blue-600 dark:bg-blue-400 transition-all duration-300"></span>
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-transform duration-300 ease-in-out ${
                    menuOpen ? "rotate-45 translate-y-1.5 w-7" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-opacity duration-300 ease-in-out my-1 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-transform duration-300 ease-in-out ${
                    menuOpen ? "-rotate-45 -translate-y-1.5 w-7" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* for mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <NavLink
            to="/students"
            className="block px-3 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            All Students
          </NavLink>

          <NavLink
            to="/profile"
            className="block px-3 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
