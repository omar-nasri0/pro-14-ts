
import './ProductAdd.css'
import FormToProducts from '../../FormToProducts/form'
function ProductAdd() {
  const input= [
    {
        dec: 'Product Name:',
        type: 'text',
        placeholder: 'Enter Product Name',
        htmlFor: 'Name', 
        id: 'Name',
        name:'name'
    },
    {
        dec: 'Product Price:',
        type: 'text',
        placeholder: 'Enter Product Price',
        htmlFor: 'Price', 
        id: 'Price',
        name:'price',
        
    },
    {
      dec: 'Profile image:',
      type: 'file',
      placeholder: '*********',
      img1: '/public/profile-avatar.png',
      accept: 'image/*',
      htmlFor: 'Profile image',
      id: 'Profile image',
      name: 'image',
    }
];
  return (
    <div className='addProduct'>
      <FormToProducts
      title='Create Products'
      input={input}
      btn="Create"/>
      </div>
  )
}

export default ProductAdd