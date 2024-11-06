import './form.css';
import { useNavigate, useParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import axios from 'axios';

interface Data {
    name: string;
    value: string;
}

export interface InputType {
    dec: string;
    type: string;
    placeholder: string;
    htmlFor: string;
    id: string;
    name: string;
    accept?: string;
}

interface Prop {
    title: string;
    btn: string;
    input: InputType[];
}

function Form({ title, btn, input }: Prop) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<Record<string, any>>({});
    const [img, setImg] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    useEffect(() => {
        const initialData: Record<string, string | null> = {};
        input.forEach((item) => {
            initialData[item.name] = '';
        });
        setData(initialData);
    }, [input]);

    const handleInput = ({ name, value }: Data) => {
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImg(imageUrl);
            setData((prevData) => ({ ...prevData, image: file }));
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const token = JSON.parse(localStorage.getItem('user') || '{}').token;
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const res = await axios.get(`https://vica.website/api/items/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(res.data);
                setName(res.data.name);
                setPrice(res.data.price);
                setImg(res.data.image_url);
                
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
        
        fetchData();
    }, [id]);

     const sendItem = async (e : React.FormEvent) => {
        e.preventDefault();
         const token = JSON.parse(localStorage.getItem('user') || '{}').token;
         if (!token) {
             console.error('No token found');
             return;
         }

         try {
            await axios.post(`https://vica.website/api/items/${id}`, {
                name:data.name,
                price:data.price,
                image_url:data.img,
                _method:'PUT'
            }, {
                 headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                 },
             });
             navigate('/');
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
        <div className="formProduct" onSubmit={sendItem }>
            <h1>{title}</h1>
            <form >
                <div className="formProductFather">
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
                                            onChange={(event) => handleInput({ name: val.name, value: event.target.value })}
                                            defaultValue={val.name === 'name' ? name : val.name === 'price' ? price : data[val.name] || ''}
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {input?.map((val, i) => (
                        val.type === 'file' && (
                            <div key={i} className='inputFile'>
                                <label htmlFor={val.htmlFor}>
                                    <img src={img || '/public/upload.svg'} alt="Uploaded preview" style={{ width: '150px', height: '150px' }} />
                                </label>
                                <input 
                                    id={val.id}
                                    type={val.type}
                                    placeholder={val.placeholder}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        )
                    ))}
                </div>
                <button type="submit">{btn}</button>
            </form>
        </div>
    );
}

export default Form;
