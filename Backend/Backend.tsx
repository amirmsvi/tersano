import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// Dummy user database
interface User {
  username: string;
  password: string;
}

const users: User[] = [];

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Interface for extended Request object
interface AuthRequest extends Request {
  user?: User;
}

// Middleware to verify JWT token
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token as string, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as User;
    next();
  });
};

// Signup route
app.post('/signup', async (req: Request, res: Response) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user: User = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

// Login route
app.post('/login', async (req: Request, res: Response) => {
  const user = users.find(u => u.username === req.body.username);
  if (!user) return res.status(400).send('User not found');

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ username: user.username }, JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).send('Invalid password');
    }
  } catch {
    res.status(500).send();
  }
});

// Protected route
app.get('/protected', authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({ message: 'Access granted', user: req.user });
});

app.listen(3000, () => console.log('Server is running...'));
