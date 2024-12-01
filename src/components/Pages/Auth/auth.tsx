import { Outlet } from "react-router-dom"
import bg from '/public/auth-bg.png'

function auth() {
  return (
    <div className="auth" style={{backgroundImage:`url(${bg})` , height:'100vh',backgroundPosition:'left'}}>
        <Outlet/>
      
    </div>
  )
}

export default auth