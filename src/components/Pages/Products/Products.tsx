import { useEffect, useState  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css'; 
interface Product {
  id: number;
  name: string;
  image_url: string;
  price: number;
}
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); 
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = JSON.parse(localStorage.getItem('user')||'{}').token;
      try {
        const response = await axios.get('https://vica.website/api/items' , {
          headers:{
            'Authorization':`Bearer ${token}`
          }
          
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
console.log(products)
const handleEdit  = (id :number)=>{
  Navigate(`/Home/EditItem/${id}`)
}
const delet = async(id:number)=>{
  const confirm :boolean= window.confirm ('Are you sure to delet this item!!!')
  if (confirm){
    const token = JSON.parse(localStorage.getItem('user') || '{}').token;
  
  
        if (!token) {
            console.error('No token found');
            return;
        }
        try{
          const response =await axios.delete(`http://vica.website/api/items/${id}` ,{
            headers:{
               'Authorization': `Bearer ${token}`
            }
          })
          console.log('Product deleted successfully', response.data);
          setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
        }
        catch (error) {
          console.error('Error deleting product:', error);
        }}
}
  return (
    <div className="products-container">
      <h2>All Products</h2>
      <Link to ='/Home/AddProduct'className="create-product">+ Create Product</Link>
      {loading ? (
        <p style={{marginTop:"15px"}}>Loading products...</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <button onClick={()=>{handleEdit(product.id)}} className="edit-button">Edit Product</button>
              <button onClick={()=>{delet(product.id)}}  className="delete-button">🗑️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
