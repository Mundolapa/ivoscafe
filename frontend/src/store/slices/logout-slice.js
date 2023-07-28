import { createSlice } from '@reduxjs/toolkit';

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {},
  reducers: {
    logout: () => {},
  },
});

export const { logout } = logoutSlice.actions;
export default logoutSlice.reducer;
