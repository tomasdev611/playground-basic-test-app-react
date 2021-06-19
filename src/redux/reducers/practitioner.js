import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPractitioners } from "../../services";

const initialState = {
  fetchingPractitioners: false,
  practitioners: null
};

export const fetchPractitioners = createAsyncThunk('practitioner/fetchPractitioners', async () => {
  const response = await getPractitioners();

  return response.data;
});

export const practitionerSlice = createSlice({
  name: 'practitioner',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPractitioners.pending]: (state) => {
      state.fetchingPractitioners = true;
    },
    [fetchPractitioners.rejected]: (state) => {
      state.fetchingPractitioners = false;
    },
    [fetchPractitioners.fulfilled]: (state, { payload }) => {
      state.fetchingPractitioners = false;
      state.practitioners = payload.practitioners
    }
  }
});

export default practitionerSlice.reducer;