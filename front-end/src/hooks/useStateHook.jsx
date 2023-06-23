import React, { useState } from 'react'

function useStateHook(initialState) {
  const [count,setCount]=useState(initialState);
  const updateState =(v)=>{
    setCount(v)
  }
  return [count,updateState];
}

export default useStateHook