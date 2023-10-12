import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AWSUser, UserProfile } from '@/types/User';

interface AuthState {
  user: undefined;
  isInitialized: boolean;
  userState: string;
  userProfile?: UserProfile;
}

const initialState: AuthState = {
  user: undefined,
  isInitialized: false,
  userState: 'INIT',
  userProfile: undefined,
};

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isInitialized = true;
      state.userState = 'LOGIN';
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    resetAuth: (state, action: PayloadAction<AWSUser>) => {
      state.userProfile = undefined;
      state.user = undefined;
      state.isInitialized = false;
      state.userState = 'INIT';
    },
  },
});

export const { setUser, setUserProfile, resetAuth } = counterSlice.actions;
//export const selectUserProfile = (state: { auth: AuthState }) => state.auth;
export default counterSlice.reducer;
