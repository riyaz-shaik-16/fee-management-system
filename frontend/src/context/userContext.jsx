import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token") || "";

        const { data } = await axios.get(
          "http://localhost:9000/api/auth/v1/get-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (data.success) {
          setUser(data.student);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = async (values) => {
    try {
      setLoading(true);
      const {data} = await axios.post(
        "http://localhost:9000/api/auth/v1/login",
        values,
        {withCredentials:true}
      );
      console.log("Data: ",data);
      if (data?.success) {
        setUser(data.student);
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.log("error in login frontend: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:9000/api/student/v1/students"
      );
      if (data.success) {
        setStudents(data.students);
        return true;
      }
      return false;
    } catch (error) {
      console.log("Error in fetching students: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:9000/api/auth/v1/logout",
        {},
        { withCredentials: true }
      );

      if (data.success) {
        setUser(null);
      }
    } catch (error) {
      console.log("Error in logout: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, login, fetchStudents, students, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
