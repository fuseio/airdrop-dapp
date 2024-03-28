import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";

export interface NavbarStateType {
  selected: string;
  currentComingSoonComponent: string;
  isWalletModalOpen: boolean;
}

const INIT_STATE: NavbarStateType = {
  selected: "",
  currentComingSoonComponent: "countdown",
  isWalletModalOpen: false,
};

const navbarSlice = createSlice({
  name: "NAVBAR_STATE",
  initialState: INIT_STATE,
  reducers: {
    setSelectedNavbar: (state, action: PayloadAction<string>) => {
      state.selected = action.payload
    },
    setIsWalletModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isWalletModalOpen = action.payload
    },
    setCurrentComingSoonComponent: (state, action: PayloadAction<string>) => {
      state.currentComingSoonComponent = action.payload
    },
  },
});

export const selectNavbarSlice = (state: AppState): NavbarStateType => state.navbar;

export const {
  setSelectedNavbar,
  setIsWalletModalOpen,
  setCurrentComingSoonComponent
} = navbarSlice.actions;

export default navbarSlice.reducer;
