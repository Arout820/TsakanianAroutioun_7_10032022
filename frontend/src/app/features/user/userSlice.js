import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('user/getUser', async (userId, token) => {
  const abortCtrl = new AbortController();
  return fetch(`http://localhost:5000/api/user/${userId}`, {
    signal: abortCtrl.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
  return () => abortCtrl.abort();
});

const userSlice = createSlice({
  name: 'user',
  initialState: { user: [], loading: false },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
