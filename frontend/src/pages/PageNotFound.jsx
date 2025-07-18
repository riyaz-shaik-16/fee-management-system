import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-100 to-pink-200 dark:from-gray-900 dark:to-gray-800 px-4 py-12 text-center">
      <AlertTriangle className="text-red-600 dark:text-red-400 w-16 h-16 mb-6" />
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        404 — Page Not Found
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Looks like you’ve wandered off the path. This page doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
