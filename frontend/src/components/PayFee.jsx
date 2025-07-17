import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user.slice";
import axios from "axios";

const PayFeesPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePayNow = async (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:9000/api/student/v1/pay-fee",
          {},
          { withCredentials: true }
        );

        console.log("data: ",data);

        if (data.success) {
          dispatch(setUser(data.student));
          navigate("/profile");
        }
      } catch (err) {
        console.error("Payment simulation failed:", err);
      } finally {
        setProcessing(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Simulate Fee Payment
        </h2>

        <form onSubmit={handlePayNow} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Card Number
            </label>
            <input
              type="text"
              required
              maxLength={16}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              CVV
            </label>
            <input
              type="password"
              required
              maxLength={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              "Pay Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayFeesPage;
