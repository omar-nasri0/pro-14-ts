import { Outlet } from "react-router-dom"
import SideBar from "../../SideBar/sidebar"
import Nav from './../../Nav/nav'
import { useLocation } from "react-router-dom"
import './Home.css'
function Home() {
  const location = useLocation();
  return (
    <div className="homePage">
      <SideBar logo='DashStack' Links={[{to:"/Home/Product" , title:'Product'}
            ,{to:"Favorite" , title:'Favorite'}
            ,{to:"OrderList" , title:'Order List'}]} 
            btn='Logout'
            url="https://vica.website/api/logout"/>
            <h1 className="hello" style={{display:location.pathname === '/Home' ? 'block' : 'none'}}>Hello My friend this Page is mine ,<br /> I'am Omar Nasri</h1>
            <Nav/>
        <Outlet/>
    </div>
  )
}

export default Home