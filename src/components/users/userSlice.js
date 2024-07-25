import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: "idle",
    error: null,
  };
  
  const GET_URL = "https://jsonplaceholder.typicode.com/posts";

  const userSlice = createSlice({
    name: "users",
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder
        .addCase()
    }
  })
  export default userSlice.reducer;