import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }: { onProductAdded: (product: any) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [isOpen, setIsOpen] = useState(false); // For modal or form visibility

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://tersano-backend.vercel.app';
      const response = await axios.post(`${backendUrl}/products`, {
        title,
        description,
        price: parseFloat(price), // Convert price to a number
        image,
      });

      if (response.status === 201) {
        onProductAdded(response.data.product); // Call callback when product is added
        setIsOpen(false); // Close modal or hide form
        setTitle(''); // Clear form fields
        setDescription('');
        setPrice('');
        setImage('');
        
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className='justify-center' >
      <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out" onClick={() => setIsOpen(true)}>Add Product</button> {/* Open modal or show form */}

      {isOpen && (
        <div className='mt-3' >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <button className='text-indigo-700 hover:underline hover:underline-offset-4' type="submit">Add Item</button>
          </form>
          <button className='text-red-500 hover:underline hover:underline-offset-4' onClick={() => setIsOpen(false)}>Cancel</button> {/* Close modal or hide form */}
        </div>
      )}
    </div>
  );
};

export default AddProduct;
