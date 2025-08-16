import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,  
} from '@tanstack/react-query'
import { CartProvider } from './context/CartContext';
import Error from './Component/Error/Error';
import Root from './Component/Root/Root';
import Home from './Component/Home/Home';
import ProductListing from './Component/ProductListing/ProductListing';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Cart from './Component/Cart/Cart';
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';
import Login from './Component/Authentication/Login';
import Register from './Component/Authentication/Register';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/collection',
        element: <ProductListing></ProductListing>
      },
      {
        path: '/collection/:category',
        element: <ProductListing></ProductListing>
      },
      {
        path: '/collection/:category/:subcategory',
        element: <ProductListing></ProductListing>
      },
      {
        path: '/product/:id',
        element: <ProductDetails></ProductDetails>
      },
      {
        path: '/cart',
        element: <Cart></Cart>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>,
)