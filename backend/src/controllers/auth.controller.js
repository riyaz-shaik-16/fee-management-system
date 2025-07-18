import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import { getIO } from "../socket.js";

export const login = async (req, res) => {
  try {
    console.log("Req body: ", req?.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "No user Found!",
      });
    }

    const correctPassword = await bcrypt.compare(password, student.password);

    if (!correctPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password!",
      });
    }

    const token = student.generateToken();

    console.log("Token generated:");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        feesPaid: student.feesPaid,
      },
    });
  } catch (error) {
    console.log("Error in login: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req?.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields Required!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password doesn't match!",
      });
    }

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        success: true,
        message: "User already exists!",
      });
    }

    const newStudent = await Student.create({ name, email, password });
    const token = newStudent.generateToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const io = getIO();
    io.emit("add_student", {
      id: newStudent._id,
      name: newStudent.name,
      email: newStudent.email,
      feePaid: newStudent.feePaid,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      student: {
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        feesPaid: newStudent.feesPaid,
      },
    });
  } catch (error) {
    console.log("Error in Signup: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const logout = async (req, res) => {
  try {
    console.log("logout hitttt");
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const id = req.user?.id;
    const student = await Student.findById(id, "_id name email feePaid");
    return res.status(200).json({
      success: true,
      message: "Fetched student successfully!",
      student,
    });
  } catch (error) {
    console.log("Error in get Profile: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
