import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div>
         <h1>
            Home<Link to={'/login'}>Login</Link>
         </h1>
    </div>
  )
}

export default Home