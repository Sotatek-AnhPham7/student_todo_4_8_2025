import {
  ADD_STUDENT,
  SET_STUDENT_INPUT_NAME,
  SET_STUDENT_INPUT_CLASS,
  SET_STUDENT_INPUT_DOB,
  SET_STUDENT_INPUT_EMAIL,
  SET_STUDENT_INPUT,
  SET_STUDENT,
  SET_STUDENTS,
  SET_SEARCH_VALUE,
  SET_SEARCH_STUDENTS,
  DELETE_STUDENT,
} from "./constants";

export const addStudent = () => ({
  type: ADD_STUDENT,
});

export const setStudentInputName = (input) => ({
  type: SET_STUDENT_INPUT_NAME,
  payload: input,
});

export const setStudentInputClass = (input) => ({
  type: SET_STUDENT_INPUT_CLASS,
  payload: input,
});

export const setStudentInputDob = (input) => ({
  type: SET_STUDENT_INPUT_DOB,
  payload: input,
});

export const setStudentInputEmail = (input) => ({
  type: SET_STUDENT_INPUT_EMAIL,
  payload: input,
});

export const setStudentInput = (input) => ({
  type: SET_STUDENT_INPUT,
  payload: input,
});

export const setStudent = () => ({
  type: SET_STUDENT,
});

export const setStudents = (students) => ({
  type: SET_STUDENTS,
  payload: students,
});

export const setSearchValue = (value) => ({
  type: SET_SEARCH_VALUE,
  payload: value,
});

export const setSearchStudents = () => ({
  type: SET_SEARCH_STUDENTS,
});

export const deleteStudent = (id) => ({
  type: DELETE_STUDENT,
  payload: id,
});
