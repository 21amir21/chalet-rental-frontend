import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setChalets: (state, action) => {
      state.chalets = action.payload.chalets;
    },
  },
});

export const { setLogin, setLogOut, setChalets } = userSlice.actions;
export default userSlice.reducer;
