import React, { useState, useCallback } from "react";
import CallbackChild from "./CallbackChild";

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // Using useCallback to memoize the handleClick function
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);
  

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <CallbackChild handleClick={handleClick} />
    </div>
  );
};

export default ParentComponent;
