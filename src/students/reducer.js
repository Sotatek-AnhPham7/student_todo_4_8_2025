import { message } from "antd";
import {
  SET_STUDENT_INPUT,
  ADD_STUDENT,
  SET_STUDENT,
  SET_STUDENTS,
  DELETE_STUDENT,
  SET_STUDENT_INPUT_NAME,
  SET_STUDENT_INPUT_EMAIL,
  SET_STUDENT_INPUT_DOB,
  SET_STUDENT_INPUT_CLASS,
} from "./constants";

const initialState = {
  students: [],
  studentInput: {},
  initID: 100,
};

function reducer(state, action) {
  switch (action.type) {
    case ADD_STUDENT:
      return {
        ...state,
        students: [
          ...state.students,
          { id: state.initID, ...state.studentInput },
        ],
        initID: state.initID + 1,
      };
    case SET_STUDENT_INPUT:
      return {
        ...state,
        studentInput: action.payload,
      };
    case SET_STUDENT_INPUT_NAME:
      return {
        ...state,
        studentInput: {
          ...state.studentInput,
          fullName: action.payload,
        },
      };
    case SET_STUDENT_INPUT_EMAIL:
      return {
        ...state,
        studentInput: {
          ...state.studentInput,
          email: action.payload,
        },
      };
    case SET_STUDENT_INPUT_DOB:
      return {
        ...state,
        studentInput: {
          ...state.studentInput,
          dob: action.payload,
        },
      };
    case SET_STUDENT_INPUT_CLASS:
      return {
        ...state,
        studentInput: {
          ...state.studentInput,
          class: action.payload,
        },
      };
    case SET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case SET_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === state.studentInput.id ? state.studentInput : student
        ),
      };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      };
    default:
      return message.error("Invalid action");
  }
}

export { initialState };
export default reducer;
