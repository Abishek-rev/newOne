import React from 'react'

export default function Functions() {
    function PressLike(d){
        const text = d;
        return console.log(text)  
    }
    const pl=PressLike;
    // pl('abi')

    //passing Function as Argument 

    const argu=()=> { return "ArgumentFunction"}
    const anotherArgu=(d)=>{console.log('This is Argu:',d)}
anotherArgu(argu())

//Functional Programming Task   (Functional Composition)
   const input ="   SuBscribe   "
   const trimedData=str=>str.trim()
   const someDiv =str =>`<div>${str}</div>`
    console.log(someDiv(trimedData(input)).toLowerCase()) 
  return (
    <div>
      Function.js
    </div>
  )
}
