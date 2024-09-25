import React, { useState, useMemo, useRef } from "react";

export default function UseMemohook({ num }) {
  const [count, setCount] = useState(0);

  const whthMemo = useMemo(() => {
    // with useMemo hook
    console.log("wiht", "calculating...!");
    return num?.reduce((total, index) => total + index, 0);
  }, [num]);

  const withoutMemo = () => {          // without useMemo  hook
    console.log("without", "calculating...!");
    return num?.reduce((total, index) => total + index, 0);
  };


  const countRef = useRef(0);
  countRef.current += 1;

  return (
    <div>
      <p>{whthMemo}</p>
      <p>{withoutMemo()}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>add Count</button>
      <h3>{count}</h3>
      <h3>Render Count:{countRef.current}</h3>
    </div>
  );
}
