import React from 'react'
import { useDispatch } from 'react-redux'
function AddPostForm() {
    const dispatch = useDispatch()
    const click=()=>{
        dispatch(title,content)
    }
  return (
    <div>
      
    </div>
  )
}

export default AddPostForm
