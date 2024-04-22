const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Protected route with authentication
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
