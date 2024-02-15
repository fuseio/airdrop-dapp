import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";

export interface UserStateType {
  isActivated: boolean;
}

const INIT_STATE: UserStateType = {
  isActivated: false,
};

const userSlice = createSlice({
  name: "USER_STATE",
  initialState: INIT_STATE,
  reducers: {
    setisActivated: (state, action: PayloadAction<boolean>) => {
      state.isActivated = action.payload
    },
  },
});

export const selectUserSlice = (state: AppState): UserStateType => state.user;

export const { setisActivated } = userSlice.actions;

export default userSlice.reducer;
