import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, clearUser, setLoading } from "../redux/slices/user.slice";
import socket from "../socket";

const useAuthGuard = () => {
  const dispatch = useDispatch();
  const [checkedSession, setCheckedSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get("http://localhost:9000/api/auth/v1/get-profile", {
          withCredentials: true,
        });

        if (data.success) {
          dispatch(setUser(data.student));
          if (!socket.connected) {
            socket.connect();
          }
        } else {
          dispatch(clearUser());
          socket.disconnect();
        }
      } catch (err) {
        dispatch(clearUser());
        socket.disconnect();
      } finally {
        dispatch(setLoading(false));
        setCheckedSession(true);
      }
    };

    checkSession();
  }, [dispatch]);

  return { checkedSession };
};

export default useAuthGuard;
