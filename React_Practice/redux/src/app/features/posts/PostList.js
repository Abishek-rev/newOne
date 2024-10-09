import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAllPost } from "./postSlice";
function PostList() {
  const posts = useSelector(selectAllPost);
  console.log("dlkvdkv", posts);
  const renderedPost = posts?.map((post) => (
    <article
      style={{
        backgroundColor: "lightblue",
        width: "49%",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
      key={post.id}
    >
      <h3 style={{ color: "black" }}>{post.title}</h3>
      <p>{post.content}</p>
    </article>
  ));
  return (
    <div style={{ width: "100%" }}>
      <h1>Posts</h1>
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: 20,
        }}
      >
        {renderedPost}
      </div>
    </div>
  );
}

export default PostList;
