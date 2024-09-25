import React from 'react'
import UseMemohook from './UseMemohook'
import { useRef } from 'react';

export default function Parent() {
    const pcountRef = useRef(0);
    pcountRef.current += 1;
    const array = [1,2,3,4,5]
  return (
    <div>
      <UseMemohook num={array} />
      <h4>Parent Count:</h4>{pcountRef.current}
    </div>
  )
}
