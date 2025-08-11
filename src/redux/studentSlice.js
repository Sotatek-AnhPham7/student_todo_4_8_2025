import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

// ==================== Async Thunks ==================== //
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    return await getStudents();
  }
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudentAsync",
  async (student) => {
    return await addStudent(student);
  }
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudentAsync",
  async (student) => {
    return await updateStudent(student);
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudentAsync",
  async (id) => {
    await deleteStudent(id);
    return id;
  }
);

// ==================== Initial State ==================== //
const initialState = {
  students: [],
  filteredStudents: [],
  search: "",
  studentInput: null,
  formVisible: false,
  loading: false,
  error: null,
};

// ==================== Slice ==================== //
const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.search = action.payload;
    },
    setSearchStudents: (state) => {
      const keyword = state.search.trim().toLowerCase();
      state.filteredStudents = keyword
        ? state.students.filter((student) =>
            Object.values(student).join(" ").toLowerCase().includes(keyword)
          )
        : state.students;
    },
    setStudentInput: (state, action) => {
      state.studentInput = action.payload;
      state.formVisible = true;
    },
    clearStudentInput: (state) => {
      state.studentInput = null;
      state.formVisible = false;
    },
    updateStudentInputField: (state, action) => {
      const { field, value } = action.payload;
      if (state.studentInput) {
        state.studentInput = {
          ...state.studentInput,
          [field]: value,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
        state.filteredStudents = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.filteredStudents.push(action.payload);
      })

      // Update
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.students = state.students.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
        state.filteredStudents = state.filteredStudents.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })

      // Delete
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s.id !== action.payload);
        state.filteredStudents = state.filteredStudents.filter(
          (s) => s.id !== action.payload
        );
      });
  },
});

// ==================== Exports ==================== //
export const {
  setSearchValue,
  setSearchStudents,
  setStudentInput,
  clearStudentInput,
  updateStudentInputField,
} = studentSlice.actions;

export const selectStudentInput = (state) => state.students.studentInput;

export default studentSlice.reducer;
