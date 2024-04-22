import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ProductCard from './ProductCard';
import AddProduct from './AddProduct';


interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
  }



function Content() {
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true); // State for loading status
const [error, setError] = useState(''); // State for error messages

const handleProductAdded = (newProduct: Product) => {
    setProducts([...products, newProduct]); // Add new product to the list
  };

  const handleProductDeleted = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId)); // Remove product by ID
  }; 

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products'); // Fetch product data
        setProducts(response.data); // Set the product list
        setLoading(false); // Update loading status
      } catch (error) {
        setError('Error fetching products'); // Handle errors
        setLoading(false);
      }
    };

    fetchProducts(); // Fetch data when component mounts
  }, []); // Run effect once on component mount

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }


  return (
    <section>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="text-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>
  
        <p className="mx-auto mt-4 max-w-md text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
          dicta incidunt est ipsam, officia dolor fugit natus?
        </p>
      </header>
  
      
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"> {/* Responsive grid */}
      {products.map((product) => (
        <li key={product.title}> {/* Use a unique key for each item */}
          <ProductCard
           key={product.id}
           id={product.id}
           title={product.title}
           description={product.description}
           price={product.price}
           image={product.image}
           onDelete={handleProductDeleted} // Pass delete callback
          />
        </li>
      ))}
      <li>
      <AddProduct onProductAdded={handleProductAdded} />
      </li>
    </ul>
    </div>
  </section>
  )
}

export default Content