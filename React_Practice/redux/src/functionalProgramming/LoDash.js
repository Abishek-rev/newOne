import React from "react";
import pipe from "lodash/fp/flow";

export default function LoDash() {
  //normal technique
  function add1(a) {
    return function (b) {
      return a + b;
    };
  }
  const result = add1(5);
  console.log("Normal Technique:", result(5));
  //curing technique

  const add = (a) => (b) => (c) => a + b + c;
  console.log("curing technique:", add(2)(2)(6));

  //
  const input = "   SuBscribe   ";
  const trimedData = (str) => str.trim();
  const someDiv = (type) => (str) => `<${type}>${str}</${type}>`; //here curying Applied
  const toLowerCase = (str) => str.toLowerCase();

  //
  const transform = pipe(trimedData, toLowerCase, someDiv("div")); //here curying Applied
  //
  console.log("this is LoDash :", transform(input));
  return <div>LoDash.js</div>;
}
