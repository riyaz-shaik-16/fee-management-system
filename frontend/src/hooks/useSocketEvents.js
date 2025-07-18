import { useEffect } from "react";
import { useDispatch } from "react-redux";
import socket from "../socket";
import { updateStudentInStore } from "../redux/slices/students.slice";

const useSocketEvents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStudentUpdate = (data) => {
      console.log("🎯 Student data updated via socket:", data);
      dispatch(updateStudentInStore(data)); // your custom action
    };

    socket.on("update_student_details", handleStudentUpdate);

    return () => {
      socket.off("update_student_details", handleStudentUpdate);
    };
  }, [dispatch]);
};

export default useSocketEvents;
