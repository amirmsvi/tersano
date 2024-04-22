import React from 'react'
import { NavLink } from 'react-router-dom';

interface ProductCardProps {
    title: string;
    description: string;
    price: string;
    image: string;
    }

function ProductCard({ title, description, price, image }: ProductCardProps) {
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
    </div>
  </NavLink>
  )
}

export default ProductCard