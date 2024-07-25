import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sub from "date-fns/sub";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const GET_URL = "https://jsonplaceholder.typicode.com/posts";

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  const response = await axios.get(GET_URL);

  return [...response.data];
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const existedPost = state.posts.find((post) => post.id === postId);
      existedPost.reactions[reaction]++;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        let min = 1;

        const fakePosts = action.payload;
        const posts = fakePosts.map((post) => {
          return {
            id: post.id,
            title: post.title,
            body: post.body,
            date: sub(new Date(), { minutes: min++ }).toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          };
        });
        state.posts = state.posts.concat(posts);
        state.status = "success";
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export const fetchAllPosts = (state) => state.posts.posts;
export const getPostById = (state,postId) => state.posts.posts.find(post => post.id === postId)

export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const {  addReaction } = postSlice.actions;
export default postSlice.reducer;
