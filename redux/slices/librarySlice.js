import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch library records
export const fetchLibrary = createAsyncThunk(
    'library/fetchLibrary',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/api/library/getLibrary`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return response.data
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            } else {
                return thunkAPI.rejectWithValue('An error occurred. Please try again.');
            }
        }
    }
)

// create library record
export const createLibrary = createAsyncThunk(
    'library/createLibrary',
    async (libraryData, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/api/library/addLibrary`, libraryData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return response.data
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
);

//  Update a library record
export const updateLibrary = createAsyncThunk(
    'library/updateLibrary',
    async ({ id, libraryData }, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/api/library/updateLibrary/${id}`, libraryData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
)

// delete a library record
export const deleteLibrary = createAsyncThunk(
    'library/deleteLibrary',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${API_URL}/api/library/deleteLibrary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
)


const librarySlice = createSlice({
    name: 'library',
    initialState: {
        libraries: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLibrary.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLibrary.fulfilled, (state, action) => {
                state.loading = false;
                state.libraries = action.payload;
                state.error = null;
            })
            .addCase(fetchLibrary.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload;
            })

            .addCase(createLibrary.pending, (state) => {
                state.loading = true;
            })
            .addCase(createLibrary.fulfilled, (state, action) => {
                state.loading = false;
                state.libraries.push(action.payload);
            })
            .addCase(createLibrary.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload;
            })

            .addCase(updateLibrary.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateLibrary.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.libraries.findIndex((library) => library._id === action.payload._id)
                if (!index === -1) {
                    state.libraries[index] = action.payload;
                }
            })
            .addCase(updateLibrary.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload;
            })

            .addCase(deleteLibrary.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteLibrary.fulfilled, (state, action) => {
                state.loading = false;
                state.records = state.libraries.filter((library) => library._id !== action.payload._id);

            })
            .addCase(deleteLibrary.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload;
            })
    }
})

export default librarySlice.reducer;