import { useSelector, useDispatch } from "react-redux";
import {
  selectStudents,
  selectStudentsLoading,
  selectStudentsError,
  setError,
  setLoading,
  setStudents,
} from "../redux/slices/students.slice";
import { useEffect } from "react";
import axios from "axios";

const AllStudents = () => {
  const students = useSelector(selectStudents);
  const loading = useSelector(selectStudentsLoading);
  const error = useSelector(selectStudentsError);
  const dispatch = useDispatch();

  const getAllStudents = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(
        "http://localhost:9000/api/student/v1/students",
        { withCredentials: true }
      );
      if (data.success) {
        dispatch(setStudents(data.students));
      }
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || "Failed to fetch students."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (students.length === 0) {
      getAllStudents();
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-10">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8 overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          All Students
        </h2>

        {loading ? (
          <div className="text-center py-8 text-gray-600 dark:text-gray-300">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600 dark:text-red-400">{error}</div>
        ) : students.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No students found.
          </div>
        ) : (
          <div className="w-full">
            <div className="hidden md:block">
              {/* Desktop Table */}
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-blue-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Fee Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <td className="py-4 px-4 text-gray-800 dark:text-gray-100">
                        {student.name}
                      </td>
                      <td className="py-4 px-4 text-gray-700 dark:text-gray-300 break-all">
                        {student.email}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            student.feePaid
                              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                              : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                          }`}
                        >
                          {student.feePaid ? "Paid" : "Not Paid"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {students.map((student) => (
                <div
                  key={student._id}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow flex flex-col space-y-2"
                >
                  <div>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">Name</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {student.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">Email</p>
                    <p className="text-gray-700 dark:text-gray-200 break-all">
                      {student.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">Fee Status</p>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        student.feePaid
                          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                      }`}
                    >
                      {student.feePaid ? "Paid" : "Not Paid"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStudents;
