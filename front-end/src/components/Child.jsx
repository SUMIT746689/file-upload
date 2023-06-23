import React from 'react'
import useStateHook from '../hooks/useStateHook';

function Child() {
  const [child, setChild] = useStateHook(0);
  
  return (
    <div>
      CHILD: {child}
      <button onClick={()=>setChild(child+1)}>UPDATE CHILD NO </button>
    </div>
  )
}

export default Child