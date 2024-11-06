import Form from '././../../Form/form'
import {InputField } from './../../Form/form'

function singup() {
  const inputs: InputField[] = [
    {
      dec: 'First Name:',
      type: 'text',
      placeholder: 'First Name',
      htmlFor: 'First Name',
      id: 'First Name',
      name: 'first_name',
    },
    {
      dec: 'Last Name:',
      type: 'text',
      placeholder: 'Last Name',
      htmlFor: 'Last Name',
      id: 'Last Name',
      name: 'last_name',
    },
    {
      dec: 'User Name:',
      type: 'text',
      placeholder: 'user Name',
      htmlFor: 'user Name',
      id: 'user Name',
      name: 'user_name',
    },
    {
      dec: 'Email address:',
      type: 'email',
      placeholder: 'example@gmail.com',
      htmlFor: 'email',
      id: 'email',
      name: 'email',
    },
    {
      dec: 'Password:',
      type: 'password',
      placeholder: '*********',
      htmlFor: 'password',
      id: 'password',
      name: 'password',
    },
    {
      dec: 'Confirmation Password:',
      type: 'password',
      placeholder: '*********',
      htmlFor: 'Confirmation password',
      id: 'Confirmation password',
      name: 'password_confirmation',
    },
    {
      dec: 'Profile image:',
      type: 'file',
      placeholder: '*********',
      img1: '/public/profile-avatar.png',
      accept: 'image/*',
      htmlFor: 'Profile image',
      id: 'Profile image',
      name: 'profile_image',
    },
  ];
  
  const message = 'Already have an account?';
  const url = 'https://vica.website/api/register';
  return (
    <div>
      <Form
  title="Create an Account"
  dec="create an account to continue"
  btn="Sign in"
  inputs={inputs}
  message={message}
  url = {url}
  to='/Auth'
/>
    </div>
  )
}

export default singup