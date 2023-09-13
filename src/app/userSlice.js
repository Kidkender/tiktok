import userAPI from "~/services/userAPI";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getMe = createAsyncThunk(
  "user/getMe",
  async (params, thunkAPI) => {
    const currentUser = await userAPI.getMe();
    return currentUser;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getMe.pending]: (state) => {
      state.loading = true;
    },

    [getMe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [getMe.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
  },
});

const { reducer: userReducer } = userSlice;
export default userReducer;
