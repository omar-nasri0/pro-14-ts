import Form from './../../Form/form';
import {InputField } from './../../Form/form'
function Login() {
    const inputs:InputField[] = [
        {
            dec: 'Email address:',
            type: 'email',
            placeholder: 'example@gmail.com',
            htmlFor: 'email', 
            id: 'email',
            name: 'email'
        },
        {
            dec: 'Password:',
            type: 'password',
            placeholder: '*********',
            htmlFor: 'password', 
            id: 'password',
            name: 'password',
            
        }
    ];
    
    const message = "Don't have an account ?";
    const url ='https://vica.website/api/login';
    
    return (
        <div className="">
            <Form 
                title='Login To Account'
                dec='Please enter your email and password to continue'
                inputs={inputs}
                message={message}
                btn="Sign In" 
                url = {url}
                to='/Home'
            />
        </div>
    );
}

export default Login;
