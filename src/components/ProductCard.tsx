import React from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

interface ProductCardProps {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    onDelete: (id: string) => void; // Callback function to delete a product
    }

function ProductCard({ id, title, description, price, image , onDelete}: ProductCardProps) {
    const handleDelete = async () => {
        try {
          const response = await axios.delete(`/products/${id}`); // Delete request
          if (response.status === 200) {
            onDelete(id); // Notify parent component to remove this product
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };
  return (
    <NavLink to="#" className="group block overflow-hidden">
    <img
      src={image}
      alt=""
      className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[350px]"
    />

    <div className="relative bg-white pt-3">
      <h3 className="text-s text-gray-900 group-hover:underline group-hover:underline-offset-4">
        {title}
      </h3>

      <p className="mt-1">
        <p className="text-xs text-gray-950 "> {description}  </p>

        <span className="tracking-wider text-gray-900 text-s"> $ {price} </span>
      </p>
      <button onClick={handleDelete} className="text-red-500">Delete</button>
    </div>
  </NavLink>
  )
}

export default ProductCard