import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { fetchTokenPrice } from "@/lib/api";

export interface BalanceStateType {
  price: number;
  isUsdPriceLoading: boolean;
}

const INIT_STATE: BalanceStateType = {
  price: 0,
  isUsdPriceLoading: false,
};

export const fetchUsdPrice = createAsyncThunk(
  "BALANCE/FETCH_USD_PRICE",
  async ({
    tokenId,
    controller
  }: {
    tokenId: string;
    controller: AbortController
  }) => {
    return new Promise<any>(async (resolve, reject) => {
      fetchTokenPrice(tokenId)
        .then((price) => {
          resolve(price);
        })
        .catch((error) => {
          reject(error);
        });
      controller.signal.addEventListener("abort", () => reject());
    });
  }
);

const balanceSlice = createSlice({
  name: "BALANCE_STATE",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: {
    [fetchUsdPrice.pending.type]: (state, action) => {
      state.isUsdPriceLoading = true;
    },
    [fetchUsdPrice.fulfilled.type]: (state, action) => {
      state.price = action.payload;
      state.isUsdPriceLoading = false;
    },
    [fetchUsdPrice.rejected.type]: (state, action) => {
      state.isUsdPriceLoading = false;
    },
  },
});

export const selectBalanceSlice = (state: AppState): BalanceStateType =>
  state.balance;

export default balanceSlice.reducer;
