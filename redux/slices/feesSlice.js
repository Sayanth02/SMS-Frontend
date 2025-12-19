import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

// Fetch fees
export const fetchFees = createAsyncThunk(
    'fees/fetchFees',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/api/fees/getAllFees`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
);

// Create a fee record
export const createFee = createAsyncThunk(
    'fees/createFee',
    async (feeData, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/api/fees/addFee`, feeData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
);

// Update a fee record
export const updateFee = createAsyncThunk(
    'fees/updateFee',
    async ({ id, feeData }, thunkAPI) => {
        console.log(feeData);
        
        try {
            const response = await axios.put(`${API_URL}/api/fees/updateFee/${id}`, feeData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("An unexpected error occurred.");
        }
    }
);

// Delete a fee record
export const deleteFee = createAsyncThunk(
    'fees/deleteFee',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${API_URL}/api/fees/deleteFee/${id}`, {
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

const feesSlice = createSlice({
    name: 'fees',
    initialState: {
        fees: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFees.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFees.fulfilled, (state, action) => {
                state.loading = false;
                state.fees = action.payload;
                state.error = null;              
            })
            .addCase(fetchFees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createFee.pending, (state) => {
                state.loading = true;
            })
            .addCase(createFee.fulfilled, (state, action) => {
                state.loading = false;
                state.fees.push(action.payload);
                state.error = null;
            })
            .addCase(createFee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateFee.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateFee.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.fees.findIndex((fee) => fee.id === action.payload.id);
                if (index !== -1) {
                    state.fees[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateFee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteFee.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteFee.fulfilled, (state, action) => {
                state.loading = false;
                state.fees = state.fees.filter((fee) => fee.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteFee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default feesSlice.reducer;
