import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";

export interface UserStateType {
  isActivated: boolean;
  currentComponent: string;
  currentSignupStep: string;
}

const INIT_STATE: UserStateType = {
  isActivated: false,
  currentComponent: "landing",
  currentSignupStep: "invite",
};

const userSlice = createSlice({
  name: "USER_STATE",
  initialState: INIT_STATE,
  reducers: {
    setIsActivated: (state, action: PayloadAction<boolean>) => {
      state.isActivated = action.payload
    },
    setCurrentComponent: (state, action: PayloadAction<string>) => {
      state.currentComponent = action.payload
    },
    setCurrentSignupStep: (state, action: PayloadAction<string>) => {
      state.currentSignupStep = action.payload
    },
  },
});

export const selectUserSlice = (state: AppState): UserStateType => state.user;

export const {
  setIsActivated,
  setCurrentComponent,
  setCurrentSignupStep
} = userSlice.actions;

export default userSlice.reducer;
