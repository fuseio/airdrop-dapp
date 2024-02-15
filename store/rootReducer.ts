import {
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import navbarReducer from "./navbarSlice";
import userReducer from "./userSlice";

const appReducer = combineReducers({
  balance: balanceReducer,
  navbar: navbarReducer,
  user: userReducer,
});

export type AppState = CombinedState<{
  balance: ReturnType<typeof balanceReducer>;
  navbar: ReturnType<typeof navbarReducer>;
  user: ReturnType<typeof userReducer>;
}>;

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return appReducer(state, action);
};

export default rootReducer;
