import {
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import navbarReducer from "./navbarSlice";

const appReducer = combineReducers({
  balance: balanceReducer,
  navbar: navbarReducer,
});

export type AppState = CombinedState<{
  balance: ReturnType<typeof balanceReducer>;
  navbar: ReturnType<typeof navbarReducer>;
}>;

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return appReducer(state, action);
};

export default rootReducer;
