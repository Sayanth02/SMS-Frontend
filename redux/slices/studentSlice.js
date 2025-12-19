import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

// Fetch students
export const fetchStudents = createAsyncThunk(
    'student/fetchStudents',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/api/student/getAllStudents`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            } else {
                return thunkAPI.rejectWithValue('An error occurred. Please try again.');
            }
        }
    }
);

// Create a student
export const createStudent = createAsyncThunk(
    'student/createStudent',
    async (studentData, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/api/student/addStudent`, studentData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log("Response:", response); 
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            } else {
                return thunkAPI.rejectWithValue('An error occurred. Please try again.');
            }
        }
    }
);

// Update a student
export const updateStudent = createAsyncThunk(
    'student/updateStudent',
    async ({ id, studentData }, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/api/student/updateStudent/${id}`, studentData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            } else {
                return thunkAPI.rejectWithValue('An error occurred. Please try again.');
            }
        }
    }
);

// Delete a student
export const deleteStudent = createAsyncThunk(
    'student/deleteStudent',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${API_URL}/api/student/deleteStudent/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return id;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            } else {
                return thunkAPI.rejectWithValue('An error occurred. Please try again.');
            }
        }
    }
);

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
                state.error = null;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(createStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.students.push(action.payload);
                state.error = null;
            })
            .addCase(createStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.students.findIndex((student) => student.id === action.payload.id);
                if (index !== -1) {
                    state.students[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.students = state.students.filter((student) => student.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default studentSlice.reducer;
