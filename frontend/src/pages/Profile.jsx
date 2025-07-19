import React, { useState } from "react";
import {
  Edit2,
  Check,
  X,
  CreditCard,
  User,
  Mail,
  DollarSign,
  LogOut,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectUser, clearUser, setUser } from "../redux/slices/user.slice";
import { clearStudents } from "../redux/slices/students.slice";
import axios from "axios";
import socket from "../socket";

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user?.name || "");
  const [tempEmail, setTempEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSave = async () => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/student/v1/update-profile`,
        { name: tempName, email: tempEmail },
        { withCredentials: true }
      );
      // console.log("Data for updaing user: ", data);
      if (data.success) {
        dispatch(setUser(data.student));
      }
      setIsEditing(false);
    } catch (err) {
      console.log("Error updating user:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTempName(user?.name || "");
    setTempEmail(user?.email || "");
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      dispatch(clearUser());
      sessionStorage.clear();
      dispatch(clearStudents());
      socket.disconnect()
      navigate("/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account information
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {!isEditing ? (
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-900 dark:text-white text-lg">
                    {user?.name || "Not provided"}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  placeholder="Enter your email address"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-900 dark:text-white text-lg break-all sm:break-normal">
                    {user?.email || "Not provided"}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Payment Status
              </label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        user?.feePaid ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span
                      className={`text-lg font-medium ${
                        user?.feePaid
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {user?.feePaid ? "Fee Paid" : "Fee Not Paid"}
                    </span>
                  </div>
                  {!user?.feePaid && (
                    <Link
                      to={`/pay-fee/${user?.email}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 justify-center"
                    >
                      <CreditCard className="w-5 h-5" />
                      Pay Fee
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Keep your information up to date for the best experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
