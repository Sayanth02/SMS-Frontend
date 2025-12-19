import { createSlice, createAsyncThunk, asyncThunkCreator } from '@reduxjs/toolkit';
import axios from 'axios';

// creating a user
export const createUser = createAsyncThunk(
    'user/createUser',
    async (userData, thunkAPI) => {
        try {
            console.log(userData);

            const response = await axios.post('http://localhost:5000/api/user/addUser', userData, {
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

// fetch user
export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/getAllUser', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(response.data);

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
// update user
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ id, userData }, thunkAPI) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/user/updateUser/${id}`, userData, {
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

// delete user
export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/user/deleteUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            } else {
                return thunkAPI.rejectWithValue('An error occurred. Please try again.');
            }
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.user);
                state.error = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = (action.payload)
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload; 
                }
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user._id !== action.payload);
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default userSlice.reducer;
