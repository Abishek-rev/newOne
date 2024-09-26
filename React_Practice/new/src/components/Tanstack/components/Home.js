import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{
      display:"flex",
      flexDirection:"row",
      gap:50
    }}>
      Home
      <Link to="/RQdata">Go</Link>
    </div>
  )
}

export default Home
