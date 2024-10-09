import React, { useState, useCallback, memo } from "react";

const ChildComponent = (({ handleClick }) => {
  console.log("Child component re-rendered");
  return <button onClick={handleClick}>Click Me</button>;
});

export default memo(ChildComponent)