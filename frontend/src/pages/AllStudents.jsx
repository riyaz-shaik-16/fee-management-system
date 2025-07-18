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
import {User} from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-6 py-8 sm:px-8">
            <h2 className="text-3xl font-bold text-white text-center sm:text-left">
              All Students
            </h2>
            <p className="text-blue-100 mt-2 text-center sm:text-left">
              Manage and track student information
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading students...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-600 dark:text-red-400 font-semibold text-lg">{error}</p>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                  No students found
                </p>
              </div>
            ) : (
              <div className="w-full">

                <div className="hidden lg:block">
                  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                            Name
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                            Email
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                            Fee Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {students.map((student, index) => (
                          <tr
                            key={student.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                          >
                            <td className="px-6 py-5">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4">
                                  <User className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                                </div>
                                <div className="text-base font-medium text-gray-900 dark:text-white">
                                  {student.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-base text-gray-700 dark:text-gray-300">
                              {student.email}
                            </td>
                            <td className="px-6 py-5">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  student.feePaid
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  student.feePaid ? 'bg-green-600' : 'bg-red-600'
                                }`}></div>
                                {student.feePaid ? "Paid" : "Not Paid"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:hidden space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 p-6 hover:shadow-md transition-shadow duration-150"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            <User className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {student.name}
                            </h3>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            student.feePaid
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            student.feePaid ? 'bg-green-600' : 'bg-red-600'
                          }`}></div>
                          {student.feePaid ? "Paid" : "Not Paid"}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Email Address
                          </p>
                          <p className="text-base text-gray-700 dark:text-gray-200 break-all">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
