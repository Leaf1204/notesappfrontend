import React from "react"
import {Link} from "react-router-dom"

const Nav =(props) => {
  return <header>
  <h1>Child Wellness Notes</h1>
  <nav>
      <Link to ="/"><div>Home</div></Link>
      <Link to ="/auth/signup"><div>Sign Up</div></Link>
      <Link to ="/auth/login"><div>Login</div></Link>
</nav>
</header>
}
export default Nav