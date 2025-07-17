import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/mode-toggle";
import { Moon, Sun, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  setUser,
  setLoading
} from "../redux/slices/user.slice";
import axios from "axios";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      await axios.get("http://localhost:9000/api/auth/v1/logout", {
        withCredentials: true,
      });
      dispatch(setUser(null));
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const authLinks = (
    <>
      <NavLink
        to="/"
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
    </>
  );

  const guestLinks = (
    <>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `font-medium transition-all duration-200 ${
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          }`
        }
      >
        Login
      </NavLink>

      <NavLink
        to="/signup"
        className={({ isActive }) =>
          `font-medium transition-all duration-200 ${
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          }`
        }
      >
        Signup
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            FeeManager
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? authLinks : guestLinks}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Burger Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 my-1 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-1" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {isAuthenticated ? (
            <>
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
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block px-3 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block px-3 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
