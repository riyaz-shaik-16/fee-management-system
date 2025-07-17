import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, clearUser, setLoading } from "../redux/slices/user.slice";

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
        } else {
          dispatch(clearUser());
        }
      } catch (err) {
        dispatch(clearUser());
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
