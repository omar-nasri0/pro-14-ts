import { Link, useNavigate } from 'react-router-dom';
import './form.css';
import profile from '/public/profile-avatar.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface HandleType {
  name: string;
  value: string;
}

export interface InputField {
  dec: string;
  type: string;
  placeholder: string;
  htmlFor: string;
  id: string;
  name: string;
  img1?: string;
  accept?: string;
}

interface Props {
  title: string;
  dec: string;
  inputs: InputField[];
  message: string;
  btn: string;
  url : string;
  to:string;
}

function Form({ inputs, title, dec, message, btn , url ,to }: Props) {
  const Navigate = useNavigate()
  const [img, setImg] = useState<string>(profile);
  const [data, setData] = useState({});
  useEffect(() => {
    const initialData: Record<string, string | null> = {};
    inputs.forEach(input => {
      initialData[input.name] = null;
    });
    
    setData(initialData);
  }, [inputs]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl);
      setData(prevData => ({ ...prevData, profile_image : file}));
    }
  };
  

  const handleInfo = ({ name, value }: HandleType) => {
    setData(prevData => ({ ...prevData, [name]: value }));
   
  };
  const send =async (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
      try{
          const res = await axios.post(url , data ,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          });
          localStorage.setItem('user' , JSON.stringify(res.data));
          Navigate(to);
      }
      catch (err) {
        if (axios.isAxiosError(err)) {
            console.error('Error message:', err.message);
            if (err.response) {
                console.error('Error response data:', err.response.data);
            }
        } else {
            console.error('Unexpected error:', err);
        }
    }

  }
console.log(data)
  return (
    <form onSubmit={send} className={inputs.length > 2 ? 'reg-form' : 'login-form'}>
      <h1>{title}</h1>
      <p className='dec'>{dec}</p>
      <form>
        {inputs?.map((input, i) => (
          <div className="father-input" key={i}>
            <label htmlFor={input.htmlFor}>
              <p className='label'>{input.dec}</p>
            </label>
            <input
              style={{ display: input.type === 'file' ? 'none' : 'block' }}
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              onChange={(event) => handleInfo({ name: input.name, value: event.target.value })}
            />
            {input.type === 'file' && (
              <>
                <input
                  id={input.id}
                  type={input.type}
                  onChange={handleImageChange}
                  
                  accept={input.accept}
                />
                {img && <img style={{ width: '100px' }} src={img} alt="Selected" />}
              </>
            )}
          </div>
        ))}
      </form>
      <button className='btn'>{btn}</button>
      <p className='message'>
        {message}
        {inputs.length > 2 ? (
          <Link to={'/Auth'}>Login</Link>
        ) : (
          <Link to={'Singup'}>Register</Link>
        )}
      </p>
    </form>
  );
}

export default Form;
