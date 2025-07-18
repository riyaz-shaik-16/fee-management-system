import Student from "../models/student.model.js";
import { getIO } from "../socket.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}, "name email feePaid").lean();

    const normalizedStudents = students.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    return res.status(200).json({
      success: true,
      message: "All students fetched successfully",
      students: normalizedStudents,
    });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req?.user?.id;
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Name and email are required" });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    student.name = name;
    student.email = email;

    await student.save();

    const io = getIO();
    io.emit("update_student_details", {
      id: student._id,
      name: student.name,
      email: student.email,
      feePaid: student.feePaid,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        feePaid: student.feePaid,
      },
    });
  } catch (err) {
    console.log("Error updating profile:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const payFee = async (req, res) => {
  const studentId = req?.user?.id;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    if (student.feePaid) {
      return res
        .status(400)
        .json({ success: false, message: "fee already paid" });
    }

    student.feePaid = true;
    await student.save();

    const io = getIO();
    io.emit("update_student_details", {
      id: student._id,
      name: student.name,
      email: student.email,
      feePaid: student.feePaid,
    });

    res.status(200).json({
      success: true,
      message: "Fee paid successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        feePaid: student.feePaid,
      },
    });
  } catch (err) {
    console.error("Error processing fee payment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
