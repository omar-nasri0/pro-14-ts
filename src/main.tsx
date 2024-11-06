import React from 'react';
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,Navigate} from "react-router-dom";
import './index.css'
import Auth from './components/Pages/Auth/auth';
import Login from './components/Pages/Login/login';
import SingUp from './components/Pages/SingUp/singup';
import Home from './components/Pages/Home/Home';
import Products from './components/Pages/Products/Products'
import Order from './components/Pages/Order/Order';
import Favorite from './components/Pages/Favorites/Favorites';
import AddProduct from './components/Pages/AddProduct/ProductAdd'
import EditItem from './components/Pages/EditItem/Edit'
const router = createBrowserRouter([
  {
    path: "/Auth",
    element:<Auth/>,
    children:[{
      path: "",
      element: <Login/>,
    },{
      path: "Singup",
      element: <SingUp/>,
    }
  ]
  },
  {
    path :'/',
    element:<Home/>,
    children:[{
      path:'',
      element:<Products/>,
    },
    {
      path:'/AddProduct',
      element:<AddProduct/>
    },
    {
      path:'/EditItem/:id',
      element:<EditItem/>,
    },
  {
    path:'Favorite',
    element:<Favorite/>
  },
{path:'OrderList',
  element:<Order/>
},
{
  path: "*",
  element: <Navigate to="/Auth" replace />,
}]
  }
]);
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
