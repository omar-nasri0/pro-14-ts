import './form.css'
import {  useNavigate } from 'react-router-dom';
import upload from '/public/upload.svg'
import { useEffect, useState } from 'react';
import axios from 'axios';
interface data{
    name:string;
    value:string;
}
export interface InputType{
    dec:string;
    type:string;
    placeholder:string;
    htmlFor:string;
    id:string;
    name:string;
    accept?:string;
}
interface prop{
    title:string;
    btn:string;
    input:InputType[];
}
function form({title , btn , input}:prop) {
    const Navigate = useNavigate();
    const [data , setData] = useState({})
    const [img , setImg] = useState(upload)
    useEffect(()=>{
        const key:Record<string , string | null> = {};
        input.forEach((item)=>{
            key[item.name] = null;
        })
        setData(key);
    },[input])
    const handleInput = ({name , value}:data)=>{
        setData(prevData =>({...prevData , [name] : value}))
    }
    const click = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImg(imageUrl);
          setData(prevData => ({ ...prevData, image : file }));
        }
      };
    const sendItem = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('user') || '{}').token;

        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const res = await axios.post("https://vica.website/api/items", data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type':'multipart/form-data'
                },
            });

            localStorage.setItem('product', JSON.stringify(res.data));
            console.log('Product added successfully', res.data);
            Navigate('/Home');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Error message:', err.message);
                if (err.response) {
                    console.error('Error response data:', err.response.data);
                }
            } else {
                console.error('Unexpected error:', err);
            }
        }
    };

  return (
    <div onSubmit={sendItem} className="formProduct">
        <h1>{title}</h1>
        <form>
  <div className="formProductFather" >
    <div className="formProductFatherLeft">
    {input?.map((val, i) => (
      <div key={i}>
        {val.type !== 'file' && (
          <>
            <label htmlFor={val.id}>{val.dec}</label>
            <input 
              id={val.id}
              type={val.type}
              accept={val.accept}
              placeholder={val.placeholder}
              onChange={((event)=>handleInput({name:val.name , value:event.target.value}) )}
            />
          </>
        )}
      </div>
    ))}
    </div>
    
    {input?.map((val, i) => (
      val.type === 'file' && (
        <div key={i} className='inputFile'>
            <label  htmlFor={val.htmlFor}><img src={img} style={{width:'150px' , height:'150px'}}/></label>
          <input 
            id={val.id}
            type={val.type}
            placeholder={val.placeholder}
            style={{display:'none'}}
            onChange={click}
          />
        </div>
      )
    ))}
  </div>
        <button>{btn}</button>
        </form>
    </div>
  )
}

export default form