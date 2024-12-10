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
    setTripList: (state, action) => {
      state.user.tripList = action.payload;
    },
    setWishList: (state, action) => {
      state.user.wishList = action.payload;
    },
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload;
    },
    setReservationList: (state, action) => {
      state.user.reservationList = action.payload;
    },
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
    setUser: (state, action) => {
      state.user = {
        ...state.user, // Retain existing user properties
        ...action.payload.user, // Update only the changed properties
      };
    },
  },
});

export const {
  setLogin,
  setLogOut,
  setChalets,
  setTripList,
  setWishList,
  setPropertyList,
  setReservationList,
  setBookingData,
  setUser,
} = userSlice.actions;
export default userSlice.reducer;
