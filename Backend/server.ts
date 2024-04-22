const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const app = express();
app.use(express.json());

// JWT secret key
const JWT_SECRET = 'your_secret_key';

// Interface for user objects
interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Dummy user database
const users: User[] = [];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};


// Signup route with unique username check and error handling
app.post('/signup', async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  // Validate that all fields are provided
  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user: User = { firstName, lastName, username, password: hashedPassword };
    users.push(user); // Add user to the dummy database
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up:', error); // Log the error
    res.status(500).json({ error: 'An error occurred during signup' });
  }
});



// Login route with detailed error handling
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = users.find((u: User) => u.username === username);
  if (!user) {
    console.warn(`Login attempt with unknown username: ${username}`); // Log invalid username
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' }); // Optional token expiration
      console.info(`User ${username} logged in successfully`); // Log successful login
      return res.json({ token });
    } else {
      console.warn(`Invalid password attempt for user: ${username}`); // Log invalid password
      return res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error logging in:', error); // Log backend error
    return res.status(500).json({ error: 'An error occurred during login' });
  }
});


// Protected route with authentication
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

// Product interface
interface Product {
  id: string; // Unique identifier for each product
  title: string;
  description: string;
  price: number;
  image: string;
}

// Dummy product data
let products: Product[] = [
  {
    id: uuidv4(), // Generate a unique ID
    title: 'Product 1',
    description: 'Description for Product 1',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', // Placeholder image URL
  },
  {
    id: uuidv4(),
    title: 'Product 2',
    description: 'Description for Product 2',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1523381140794-a1eef18a37c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjQ2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  },
];

// GET endpoint to return product list
app.get('/products', (req, res) => {
  res.json(products); // Return product list
});

// POST endpoint to add new products
app.post('/products', (req, res) => {
  const { title, description, price, image } = req.body;

  if (!title || !description || !price || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newProduct: Product = {
    id: uuidv4(), // Generate a unique ID for the new product
    title,
    description,
    price,
    image,
  };

  products.push(newProduct); // Add the new product to the list
  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

// DELETE endpoint to remove products by ID
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const initialLength = products.length;
  products = products.filter((product) => product.id !== id); // Remove product with matching ID

  if (products.length === initialLength) {
    return res.status(404).json({ error: 'Product not found' }); // If no product was removed
  }

  res.json({ message: 'Product deleted successfully' }); // Confirm deletion
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
