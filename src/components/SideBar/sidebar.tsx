import axios from 'axios';
import './sidebar.css'
import { NavLink, useNavigate } from 'react-router-dom'

interface Links{
  to:string;
  title:string;
}
interface prop{
  logo:string;
  btn:string;
  Links:Links[];
  url:string;
}
function sidebar({logo , Links , btn , url}:prop) {

  const Navigate = useNavigate();
  const logout =async ()=>{
    const confirm :boolean= window.confirm ('Are you sure to Logout from here!!!')
    if (confirm) {
      const token = JSON.parse(localStorage.getItem('user')||'{}').token;
    try{
      await axios.post(url , {} ,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
        
      });
      localStorage.removeItem('user');
      Navigate('/Auth')
    }
    catch(error){
      console.log(error);
    }
    }
  
  }
  return (
    <div className='sidebar'>
        <div className="info">
        <h1>{logo}</h1>
        {Links?.map((val , index)=>{
            return(
        <NavLink 
                key={index}
                to={val?.to}
                className=
                {({ isActive}) =>
                isActive ? "active" : ""}>
                {val?.title}
        </NavLink>
            )
        })
        }
        </div>
        <button onClick={logout}>{btn}</button>
        
    </div>
  )
}

export default sidebar