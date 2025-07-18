import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUserLoading } from "../redux/slices/user.slice";
import { Navigate, Link } from "react-router-dom";
import { ThemeToggle } from "../components";

const Landing = () => {
  const loading = useSelector(selectUserLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (isAuthenticated) return <Navigate to="/profile" replace />;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 px-4 py-12 text-center relative">

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Manage Student Fees Seamlessly
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
          A modern platform to track, manage, and pay student fees effortlessly — built for institutions and students.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-white border border-blue-600 dark:border-gray-500 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
