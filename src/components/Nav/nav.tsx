import { useEffect, useState } from 'react';
import './nav.css';
import { IoMdSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";

function Nav() {

  const [theme, setTheme] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [ user , setUser] =useState('');
  const [image , setImage] =useState('');
  useEffect(() => {
    const userString = localStorage.getItem('user');
    console.log(userString)
    if (userString) {
        const data = JSON.parse(userString);
        setFirstName(data.user.first_name);
        setUser (data.user.user_name);
        setImage(data.user.profile_image_url)
    } else {
        console.error('User not found in localStorage');
    }
}, []);
  
  const toggleTheme = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    if (theme) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className='nav'>
      <div className="search">
        <input type="text" placeholder='Search a product...' />
      </div>

      <div className="info">
        <div className="info-user">
          <div className="img">
           
              <img src={image} alt="User" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          </div>

          
            <div className="name">
              <h3>{firstName}</h3>
              <p>{user}</p> 
            </div>
        </div>

        <i style={{ display: theme ? "none" : "block" }} onClick={toggleTheme}>
          <IoMdSunny />
        </i>
        <i style={{ display: theme ? "block" : "none" }} onClick={toggleTheme}>
          <IoMdMoon style={{ color: 'white' }} />
        </i>
      </div>
    </div>
  );
}

export default Nav;
