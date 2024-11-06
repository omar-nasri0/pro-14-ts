import { Outlet } from "react-router-dom"
import SideBar from "../../SideBar/sidebar"
import Nav from './../../Nav/nav'
function Home() {
  return (
    <div className="homePage">
      <SideBar logo='DashStack' Links={[{to:"/" , title:'Product'}
            ,{to:"/Favorite" , title:'Favorite'}
            ,{to:"/OrderList" , title:'Order List'}]} 
            btn='Logout'
            url="https://vica.website/api/logout"/>
            <Nav/>
        <Outlet/>
    </div>
  )
}

export default Home