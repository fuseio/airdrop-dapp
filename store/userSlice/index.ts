import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";

export interface UserStateType {
  isAuthenticated: boolean;
  currentComponent: string;
  currentSignupStep: string;
}

const INIT_STATE: UserStateType = {
  isAuthenticated: false,
  currentComponent: "landing",
  currentSignupStep: "invite",
};

const userSlice = createSlice({
  name: "USER_STATE",
  initialState: INIT_STATE,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
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
  setIsAuthenticated,
  setCurrentComponent,
  setCurrentSignupStep
} = userSlice.actions;

export default userSlice.reducer;
