import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
function RQdata() {
  const { data, isLoading, isError, error ,isFetching,refetch} = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    // staleTime:30000,
    // refetchInterval:1000,
    // refetchIntervalInBackground:1000
    // enabled:false
  });

  if (isLoading) {
    return <h1>Loading....!</h1>;
  }
  if (isError) {
    return <h1>Error....!</h1>;
  }
  console.log(data);
  return (
    <div>
        <Link to="/">GoBack</Link>
        <button onClick={refetch}></button>
      Post RQ page
      <div>
        {data?.data.map((post,index) => (
          <div key={index} style={{ display: "flex", gap: 20, flexDirection: "column" ,margin:20,justifyContent:"center",alignItems:"center"}}>
            <div style={{ backgroundColor: "lightblue",padding:20,minWidth:300 }}>
              <div>{post.id}</div>
              <div>{post.title}</div>
              <div>{post.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RQdata;
