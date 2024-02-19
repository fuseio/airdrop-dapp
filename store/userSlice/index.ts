import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { CreateUser, SignData, User } from "@/lib/types";
import { postAuthenticateUser, postCreateUser } from "@/lib/api";
import { RootState } from "../store";

const initUser: User = {
  id: "",
  walletAddress: "",
  twitterAccountId: "",
  points: "0",
  referralCode: ""
}

export interface UserStateType {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isCreating: boolean;
  isUser: boolean;
  isHydrated: boolean;
  currentComponent: string;
  currentSignupStep: string;
  inviteCode: string;
  twitterAccountId: string;
  accessToken: string;
  user: User;
}

const INIT_STATE: UserStateType = {
  isAuthenticating: false,
  isAuthenticated: false,
  isCreating: false,
  isUser: false,
  isHydrated: false,
  currentComponent: "landing",
  currentSignupStep: "invite",
  inviteCode: "",
  twitterAccountId: "",
  accessToken: "",
  user: initUser
};

export const authenticate = createAsyncThunk(
  "OPERATOR/AUTHENTICATE",
  async ({
    signData,
  }: {
    signData: SignData;
  }) => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const authenticatedUser = await postAuthenticateUser(signData);
        if (authenticatedUser?.jwt) {
          resolve(authenticatedUser.jwt);
        } else {
          reject();
        }
      } catch (error) {
        console.error(error);
        reject();
      }
    });
  }
);

export const create = createAsyncThunk<
  any,
  {
    createUserDetail: CreateUser;
  },
  { state: RootState }
>(
  "OPERATOR/CREATE",
  async ({
    createUserDetail,
  }: {
    createUserDetail: CreateUser;
  },
    thunkAPI
  ) => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const state = thunkAPI.getState();
        const userState: UserStateType = state.user;
        const createdUser = await postCreateUser(createUserDetail, userState.accessToken);
        if (createdUser?.id) {
          resolve(createdUser);
        } else {
          reject();
        }
      } catch (error) {
        console.error(error);
        reject();
      }
    });
  }
);

const userSlice = createSlice({
  name: "USER_STATE",
  initialState: INIT_STATE,
  reducers: {
    setCurrentComponent: (state, action: PayloadAction<string>) => {
      state.currentComponent = action.payload
    },
    setCurrentSignupStep: (state, action: PayloadAction<string>) => {
      state.currentSignupStep = action.payload
    },
    setInviteCode: (state, action: PayloadAction<string>) => {
      state.inviteCode = action.payload
      localStorage.setItem("airdrop-inviteCode", action.payload);
    },
    setTwitterAccountId: (state, action: PayloadAction<string>) => {
      state.twitterAccountId = action.payload
      localStorage.setItem("airdrop-twitterAccountId", action.payload);
    },
    setLogout: (state) => {
      state.inviteCode = "";
      state.twitterAccountId = "";
      state.accessToken = "";
      state.isUser = false;
      state.user = initUser;
      localStorage.removeItem("airdrop-inviteCode");
      localStorage.removeItem("airdrop-twitterAccountId");
      localStorage.removeItem("airdrop-accessToken");
      localStorage.removeItem("airdrop-isUser");
      localStorage.removeItem("airdrop-user");
    },
    setHydrate: (state) => {
      const inviteCode = localStorage.getItem("airdrop-inviteCode");
      const twitterAccountId = localStorage.getItem("airdrop-twitterAccountId");
      const accessToken = localStorage.getItem("airdrop-accessToken");
      const isUser = localStorage.getItem("airdrop-isUser");
      const user = localStorage.getItem("airdrop-user");
      state.inviteCode = inviteCode ?? "";
      state.twitterAccountId = twitterAccountId ?? "";
      state.accessToken = accessToken ?? "";
      state.isUser = isUser ? JSON.parse(isUser) : false;
      state.user = user ? JSON.parse(user) : initUser;
      state.isHydrated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload;
        localStorage.setItem("airdrop-accessToken", action.payload);
      })
      .addCase(authenticate.rejected, (state) => {
        state.isAuthenticating = false;
      })
      .addCase(create.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isCreating = false;
        state.isUser = true;
        state.user = action.payload;
        localStorage.setItem("airdrop-isUser", "true");
        localStorage.setItem("airdrop-user", JSON.stringify(action.payload));
      })
      .addCase(create.rejected, (state) => {
        state.isCreating = false;
      })
  },
});

export const selectUserSlice = (state: AppState): UserStateType => state.user;

export const {
  setCurrentComponent,
  setCurrentSignupStep,
  setInviteCode,
  setTwitterAccountId,
  setLogout,
  setHydrate
} = userSlice.actions;

export default userSlice.reducer;
