import axios from "axios";

const columns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Class",
    dataIndex: "class",
    key: "class",
  },
];

const getStudents = async () => {
  try {
    const response = await axios.get(
      "https://6895796f039a1a2b288f43fd.mockapi.io/api/students/students"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

const addStudent = async (student) => {
  try {
    const response = await axios.post(
      "https://6895796f039a1a2b288f43fd.mockapi.io/api/students/students",
      student
    );
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

const updateStudent = async (student) => {
  try {
    const response = await axios.put(
      `https://6895796f039a1a2b288f43fd.mockapi.io/api/students/students/${student.id}`,
      student
    );
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

const deleteStudent = async (id) => {
  try {
    await axios.delete(
      `https://6895796f039a1a2b288f43fd.mockapi.io/api/students/students/${id}`
    );
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};

export { columns, getStudents, addStudent, updateStudent, deleteStudent };
