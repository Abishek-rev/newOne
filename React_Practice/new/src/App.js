import logo from "./logo.svg";
import "./App.css";
import InputField from "./InputField";
import { useRef, useState } from "react";
import Asyncdatas from "./components/Asyncdatas";
// import { QueryClient } from "@tanstack/react-query";
// import AnimationAndTransition from "./components/css_Conepts/AnimationAndTransition";
function App() {
  return (
    
      <div className="App">
        <Asyncdatas />
        {/* <AnimationAndTransition /> */}
        {/* <InputField/> */}
      </div>
  );
}

export default App;
