// src/services/studentService.js
import axiosInstance from "./axiosInstance";

// Helper gọi API
const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const getStudents = () => handleRequest(axiosInstance.get("/students"));

export const addStudent = (student) =>
  handleRequest(axiosInstance.post("/students", student));

export const updateStudent = (student) =>
  handleRequest(axiosInstance.put(`/students/${student.id}`, student));

export const deleteStudent = (id) =>
  handleRequest(axiosInstance.delete(`/students/${id}`));
