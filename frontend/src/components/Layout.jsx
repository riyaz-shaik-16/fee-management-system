import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import socket from "../socket";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent, addStudent } from "../redux/slices/students.slice";
import { selectStudents } from "../redux/slices/students.slice";

const Layout = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectStudents);

  useEffect(() => {
    socket.on("update_student_details", (updatedData) => {
      // console.log("Received student update:", updatedData);
      dispatch(updateStudent(updatedData));
      // console.log("Students after updating: ",students);
    });

    socket.on("add_student", (newStudent) => {
      // console.log("New student added:", newStudent);
      dispatch(addStudent(newStudent));
    });

    return () => {
      socket.off("update_student_details");
      socket.off("add_student");
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
