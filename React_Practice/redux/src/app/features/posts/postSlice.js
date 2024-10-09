import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "learn redux",
    content: "suma oru lesson",
  },
  {
    id: "2",
    title: "learn redux with immer ",
    content: "suma oru lesson with immer ",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});
export const selectAllPost = (state) => state.posts;
export const { postAdded } = postSlice.actions;
export default postSlice.reducer;
